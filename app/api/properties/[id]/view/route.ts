import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/properties/[id]/view - Increment property view count
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;

    // Increment the view count
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: 'View counted' });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json(
      { error: 'Failed to increment view count' },
      { status: 500 }
    );
  }
}
