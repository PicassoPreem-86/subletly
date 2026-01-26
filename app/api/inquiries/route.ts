import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ inquiries });
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

    // TODO: In production, send email notification to landlord
    // await sendEmail({
    //   to: property.landlord.email,
    //   subject: `New inquiry for ${property.title}`,
    //   body: `You have a new inquiry from ${session.user.firstName}...`
    // });

    return NextResponse.json({
      message: 'Inquiry sent successfully',
      inquiry,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
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
