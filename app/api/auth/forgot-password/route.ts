import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkRateLimit,
  RATE_LIMITS,
  rateLimitResponse,
  addRateLimitHeaders,
} from '@/lib/rate-limit';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Rate limit by email: 3 requests per hour
    // Using email as the key to prevent abuse per email address
    const rateLimitResult = checkRateLimit(
      `forgot-password:${email.toLowerCase()}`,
      RATE_LIMITS.forgotPassword
    );

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult);
    }

    // In a production environment, you would:
    // 1. Check if the email exists in the database
    // 2. Generate a secure reset token
    // 3. Store the token with an expiration time
    // 4. Send a reset email with a link containing the token

    // For now, we'll simulate success to prevent email enumeration attacks
    // Always return success regardless of whether the email exists
    console.log(`Password reset requested for: ${email}`);

    const response = NextResponse.json(
      { message: 'If an account exists with this email, a reset link has been sent.' },
      { status: 200 }
    );
    return addRateLimitHeaders(response, rateLimitResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
