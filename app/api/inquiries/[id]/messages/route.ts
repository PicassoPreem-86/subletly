import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(2000, 'Message is too long'),
});

// POST /api/inquiries/[id]/messages - Add a reply to an inquiry
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id: inquiryId } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = messageSchema.parse(body);

    // Get the inquiry and verify access
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: {
        property: {
          select: {
            landlordId: true,
          },
        },
      },
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    const isRenter = inquiry.renterId === session.user.id;
    const isLandlord = inquiry.property.landlordId === session.user.id;

    if (!isRenter && !isLandlord) {
      return NextResponse.json(
        { error: 'You do not have access to this inquiry' },
        { status: 403 }
      );
    }

    // Create the message and update inquiry in a transaction
    const [message] = await prisma.$transaction([
      prisma.message.create({
        data: {
          inquiryId,
          senderId: session.user.id,
          content: validatedData.content,
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              image: true,
            },
          },
        },
      }),
      prisma.inquiry.update({
        where: { id: inquiryId },
        data: {
          lastMessageAt: new Date(),
          // Set status to RESPONDED if landlord is replying to a PENDING inquiry
          ...(isLandlord && inquiry.status === 'PENDING'
            ? { status: 'RESPONDED' }
            : {}),
        },
      }),
    ]);

    return NextResponse.json({
      message,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
