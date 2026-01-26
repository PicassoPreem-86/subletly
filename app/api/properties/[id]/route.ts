// Property API Routes - Get, Update, Delete by ID
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { propertySchema } from '@/lib/validations';
import { z } from 'zod';

// GET /api/properties/[id] - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        landlord: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            verified: true,
            bio: true,
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

    // Increment view count
    await prisma.property.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    // Parse JSON fields
    const parsedProperty = {
      ...property,
      amenities: JSON.parse(property.amenities),
      images: JSON.parse(property.images),
    };

    return NextResponse.json(parsedProperty);
  } catch (error) {
    console.error('GET property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] - Update property (landlord only, own properties)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if property exists and belongs to user
    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (existingProperty.landlordId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only update your own properties' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = propertySchema.partial().parse(body);

    // Update property
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        ...validatedData,
        amenities: validatedData.amenities ? JSON.stringify(validatedData.amenities) : undefined,
        images: validatedData.images ? JSON.stringify(validatedData.images) : undefined,
      },
      include: {
        landlord: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            verified: true,
          },
        },
      },
    });

    // Parse JSON fields
    const parsedProperty = {
      ...updatedProperty,
      amenities: JSON.parse(updatedProperty.amenities),
      images: JSON.parse(updatedProperty.images),
    };

    return NextResponse.json({
      message: 'Property updated successfully',
      property: parsedProperty,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('PUT property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Delete property (landlord only, own properties)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if property exists and belongs to user
    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (existingProperty.landlordId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own properties' },
        { status: 403 }
      );
    }

    // Delete property
    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Property deleted successfully',
    });
  } catch (error) {
    console.error('DELETE property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
