// User Signup API Route
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';
import {
  getClientIP,
  checkRateLimit,
  RATE_LIMITS,
  rateLimitResponse,
  addRateLimitHeaders,
} from '@/lib/rate-limit';

// Validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  accountType: z.enum(['RENTER', 'LANDLORD'], {
    message: 'Account type must be either RENTER or LANDLORD',
  }),
});

export async function POST(request: NextRequest) {
  // Rate limit by IP: 5 signups per day
  const ip = getClientIP(request);
  const rateLimitResult = checkRateLimit(`signup:${ip}`, RATE_LIMITS.signup);

  if (!rateLimitResult.success) {
    return rateLimitResponse(rateLimitResult);
  }

  try {
    const body = await request.json();

    // Validate input
    const validatedData = signupSchema.parse(body);

    // Check if user already exists with this email AND account type (compound unique)
    const existingUser = await prisma.user.findUnique({
      where: {
        email_accountType: {
          email: validatedData.email,
          accountType: validatedData.accountType,
        },
      },
    });

    if (existingUser) {
      const response = NextResponse.json(
        { error: `A ${validatedData.accountType.toLowerCase()} account already exists with this email` },
        { status: 400 }
      );
      return addRateLimitHeaders(response, rateLimitResult);
    }

    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: validatedData.email,
      password: validatedData.password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        accountType: validatedData.accountType,
      },
    });

    if (authError || !authData.user) {
      console.error('Supabase Auth error:', authError);
      const response = NextResponse.json(
        { error: authError?.message || 'Failed to create auth user' },
        { status: 500 }
      );
      return addRateLimitHeaders(response, rateLimitResult);
    }

    // Step 2: Hash password for database
    const hashedPassword = await hash(validatedData.password, 12);

    // Step 3: Create user in PostgreSQL database
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        accountType: validatedData.accountType,
        emailVerified: new Date(), // Mark as verified since Supabase confirmed
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        accountType: true,
        createdAt: true,
      },
    });

    console.log('User created successfully:');
    console.log('  - Supabase Auth ID:', authData.user.id);
    console.log('  - Database ID:', user.id);
    console.log('  - Email:', user.email);
    console.log('  - Account Type:', user.accountType);

    const response = NextResponse.json(
      {
        message: 'User created successfully',
        user,
        authId: authData.user.id,
      },
      { status: 201 }
    );
    return addRateLimitHeaders(response, rateLimitResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
      return addRateLimitHeaders(response, rateLimitResult);
    }

    console.error('Signup error:', error);
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    return addRateLimitHeaders(response, rateLimitResult);
  }
}
