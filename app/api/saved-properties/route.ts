import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/saved-properties - Get user's saved properties
export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const savedProperties = await prisma.savedProperty.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            description: true,
            city: true,
            state: true,
            monthlyRent: true,
            bedrooms: true,
            bathrooms: true,
            images: true,
            propertyType: true,
            availableFrom: true,
            availableTo: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ savedProperties });
  } catch (error) {
    console.error('Error fetching saved properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saved properties' },
      { status: 500 }
    );
  }
}

// POST /api/saved-properties - Save/favorite a property
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
    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Check if already saved
    const existingSave = await prisma.savedProperty.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    if (existingSave) {
      return NextResponse.json(
        { error: 'Property already saved' },
        { status: 400 }
      );
    }

    // Create saved property
    const savedProperty = await prisma.savedProperty.create({
      data: {
        userId: session.user.id,
        propertyId,
      },
      include: {
        property: true,
      },
    });

    return NextResponse.json({
      message: 'Property saved successfully',
      savedProperty,
    });
  } catch (error) {
    console.error('Error saving property:', error);
    return NextResponse.json(
      { error: 'Failed to save property' },
      { status: 500 }
    );
  }
}

// DELETE /api/saved-properties?propertyId=xxx - Unsave/unfavorite a property
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Delete the saved property
    await prisma.savedProperty.delete({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    return NextResponse.json({
      message: 'Property removed from saved',
    });
  } catch (error) {
    console.error('Error removing saved property:', error);
    return NextResponse.json(
      { error: 'Failed to remove saved property' },
      { status: 500 }
    );
  }
}
