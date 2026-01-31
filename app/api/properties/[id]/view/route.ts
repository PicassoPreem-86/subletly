import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  getClientIP,
  checkRateLimit,
  RATE_LIMITS,
  addRateLimitHeaders,
} from '@/lib/rate-limit';

// POST /api/properties/[id]/view - Increment property view count
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: propertyId } = await params;

    // Rate limit by IP + property ID: 1 view per hour per property
    const ip = getClientIP(request);
    const rateLimitResult = checkRateLimit(
      `property-view:${ip}:${propertyId}`,
      RATE_LIMITS.propertyView
    );

    if (!rateLimitResult.success) {
      // Silently succeed for rate-limited view requests
      // We don't want to show an error to users, just don't count duplicate views
      const response = NextResponse.json({ message: 'View counted' });
      return addRateLimitHeaders(response, rateLimitResult);
    }

    // Increment the view count
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const response = NextResponse.json({ message: 'View counted' });
    return addRateLimitHeaders(response, rateLimitResult);
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json(
      { error: 'Failed to increment view count' },
      { status: 500 }
    );
  }
}
