// Check Email API Route - Determines which account types exist for an email
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import {
  getClientIP,
  checkRateLimit,
  RATE_LIMITS,
  rateLimitResponse,
  addRateLimitHeaders,
} from '@/lib/rate-limit';

const checkEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  // Rate limit by IP: 5 requests per minute
  const ip = getClientIP(request);
  const rateLimitResult = checkRateLimit(`check-email:${ip}`, RATE_LIMITS.checkEmail);

  if (!rateLimitResult.success) {
    return rateLimitResponse(rateLimitResult);
  }

  try {
    const body = await request.json();
    const { email } = checkEmailSchema.parse(body);

    // Find all accounts with this email (could be RENTER, LANDLORD, or both)
    const users = await prisma.user.findMany({
      where: { email: email.toLowerCase() },
      select: { accountType: true },
    });

    const hasRenter = users.some(u => u.accountType === 'RENTER');
    const hasLandlord = users.some(u => u.accountType === 'LANDLORD');

    const response = NextResponse.json({
      hasRenter,
      hasLandlord,
      accountCount: users.length,
    });

    return addRateLimitHeaders(response, rateLimitResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
      return addRateLimitHeaders(response, rateLimitResult);
    }

    console.error('Check email error:', error);
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    return addRateLimitHeaders(response, rateLimitResult);
  }
}
