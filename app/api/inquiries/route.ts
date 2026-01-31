import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { sendNewInquiryNotification } from '@/lib/email';

// Validation schema for inquiry creation
const inquirySchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
  phone: z.string().optional(),
  moveInDate: z.string().optional(),
});

// GET /api/inquiries - Get user's inquiries
export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const inquiries = await prisma.inquiry.findMany({
      where: {
        renterId: session.user.id,
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
            landlord: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
              },
            },
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

    // Calculate unread count for all inquiries in a single query (fixes N+1)
    const inquiryIds = inquiries.map((i) => i.id);
    const unreadCounts = await prisma.message.groupBy({
      by: ['inquiryId'],
      where: {
        inquiryId: { in: inquiryIds },
        senderId: { not: session.user.id }, // Messages not sent by renter
        readAt: null,
      },
      _count: {
        id: true,
      },
    });

    // Create a map for quick lookup
    const unreadCountMap = new Map(
      unreadCounts.map((item) => [item.inquiryId, item._count.id])
    );

    const inquiriesWithUnread = inquiries.map((inquiry) => ({
      ...inquiry,
      unreadCount: unreadCountMap.get(inquiry.id) || 0,
      lastMessage: inquiry.messages[0] || null,
    }));

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
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST /api/inquiries - Send an inquiry to a landlord
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = inquirySchema.parse(body);

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: validatedData.propertyId },
      include: {
        landlord: {
          select: {
            id: true,
            email: true,
            firstName: true,
          },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Don't allow landlords to inquire about their own properties
    if (property.landlordId === session.user.id) {
      return NextResponse.json(
        { error: 'You cannot inquire about your own property' },
        { status: 400 }
      );
    }

    // Create the inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        renterId: session.user.id,
        propertyId: validatedData.propertyId,
        message: validatedData.message,
        phone: validatedData.phone,
        moveInDate: validatedData.moveInDate ? new Date(validatedData.moveInDate) : null,
        status: 'PENDING',
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            state: true,
            monthlyRent: true,
          },
        },
      },
    });

    // Send email notification to landlord (non-blocking)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    sendNewInquiryNotification({
      landlordEmail: property.landlord.email,
      landlordName: property.landlord.firstName,
      renterName: `${session.user.firstName} ${session.user.lastName}`,
      propertyTitle: property.title,
      message: validatedData.message,
      inquiryUrl: `${baseUrl}/dashboard/landlord/inquiries/${inquiry.id}`,
    }).catch((err) => {
      console.error('Failed to send inquiry notification email:', err);
    });

    return NextResponse.json({
      message: 'Inquiry sent successfully',
      inquiry,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}
