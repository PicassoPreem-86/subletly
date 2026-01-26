// My Listings API Route - Get landlord's own properties
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

    // Get landlord's properties
    const properties = await prisma.property.findMany({
      where: {
        landlordId: session.user.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON fields
    const parsedProperties = properties.map((property) => ({
      ...property,
      amenities: JSON.parse(property.amenities),
      images: JSON.parse(property.images),
    }));

    return NextResponse.json({
      properties: parsedProperties,
      total: properties.length,
    });
  } catch (error) {
    console.error('GET my-listings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
