// User Signup API Route
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

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
  try {
    const body = await request.json();

    // Validate input
    const validatedData = signupSchema.parse(body);

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: authError?.message || 'Failed to create auth user' },
        { status: 500 }
      );
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

    console.log('✅ User created successfully:');
    console.log('  - Supabase Auth ID:', authData.user.id);
    console.log('  - Database ID:', user.id);
    console.log('  - Email:', user.email);
    console.log('  - Account Type:', user.accountType);

    return NextResponse.json(
      {
        message: 'User created successfully',
        user,
        authId: authData.user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
