import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/landlord/inquiries - Get all inquiries for landlord's properties
export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.user.accountType !== 'LANDLORD') {
      return NextResponse.json(
        { error: 'Only landlords can access this endpoint' },
        { status: 403 }
      );
    }

    // Get all inquiries for properties owned by this landlord
    const inquiries = await prisma.inquiry.findMany({
      where: {
        property: {
          landlordId: session.user.id,
        },
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            state: true,
            monthlyRent: true,
            images: true,
          },
        },
        renter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
          },
        },
        messages: {
          select: {
            id: true,
            senderId: true,
            content: true,
            readAt: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1, // Get last message for preview
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: [
        { lastMessageAt: { sort: 'desc', nulls: 'last' } },
        { createdAt: 'desc' },
      ],
    });

    // Calculate unread count for each inquiry
    const inquiriesWithUnread = await Promise.all(
      inquiries.map(async (inquiry) => {
        const unreadCount = await prisma.message.count({
          where: {
            inquiryId: inquiry.id,
            senderId: { not: session.user.id }, // Messages not sent by landlord
            readAt: null,
          },
        });

        return {
          ...inquiry,
          unreadCount,
          lastMessage: inquiry.messages[0] || null,
        };
      })
    );

    // Get total unread count across all inquiries
    const totalUnread = inquiriesWithUnread.reduce(
      (sum, inq) => sum + inq.unreadCount,
      0
    );

    return NextResponse.json({
      inquiries: inquiriesWithUnread,
      totalUnread,
    });
  } catch (error) {
    console.error('Error fetching landlord inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
