import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PATCH /api/inquiries/[id]/read - Mark all unread messages as read for the current user
export async function PATCH(
  _request: NextRequest,
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

    // Mark all messages from the OTHER user as read
    // (messages sent by the current user don't need to be marked as read)
    const result = await prisma.message.updateMany({
      where: {
        inquiryId,
        senderId: { not: session.user.id },
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      markedAsRead: result.count,
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark messages as read' },
      { status: 500 }
    );
  }
}
