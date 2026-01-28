// Check Email API Route - Determines which account types exist for an email
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const checkEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
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

    return NextResponse.json({
      hasRenter,
      hasLandlord,
      accountCount: users.length,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Check email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
