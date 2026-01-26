// Properties API Routes - List and Create
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { propertySchema, propertyFilterSchema } from '@/lib/validations';
import { z } from 'zod';

// GET /api/properties - List all active properties with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate filters
    const filters = propertyFilterSchema.parse({
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
      bathrooms: searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined,
      propertyType: searchParams.get('propertyType') || undefined,
      furnished: searchParams.get('furnished') === 'true' ? true : undefined,
      petsAllowed: searchParams.get('petsAllowed') === 'true' ? true : undefined,
      parking: searchParams.get('parking') === 'true' ? true : undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 20,
    });

    const skip = (filters.page - 1) * filters.pageSize;

    // Build where clause
    const where: Prisma.PropertyWhereInput = {
      status: 'ACTIVE',
    };

    if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' };
    if (filters.state) where.state = filters.state;
    if (filters.minPrice || filters.maxPrice) {
      where.monthlyRent = {};
      if (filters.minPrice) where.monthlyRent.gte = filters.minPrice;
      if (filters.maxPrice) where.monthlyRent.lte = filters.maxPrice;
    }
    if (filters.bedrooms !== undefined) where.bedrooms = filters.bedrooms;
    if (filters.bathrooms !== undefined) where.bathrooms = filters.bathrooms;
    if (filters.propertyType) where.propertyType = filters.propertyType;
    if (filters.furnished !== undefined) where.furnished = filters.furnished;
    if (filters.petsAllowed !== undefined) where.petsAllowed = filters.petsAllowed;
    if (filters.parking !== undefined) where.parking = filters.parking;

    // Get total count and properties
    const [total, properties] = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
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
        skip,
        take: filters.pageSize,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Parse JSON fields
    const parsedProperties = properties.map((property) => ({
      ...property,
      amenities: JSON.parse(property.amenities),
      images: JSON.parse(property.images),
    }));

    return NextResponse.json({
      data: parsedProperties,
      total,
      page: filters.page,
      pageSize: filters.pageSize,
      totalPages: Math.ceil(total / filters.pageSize),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid filter parameters', details: error.issues },
        { status: 400 }
      );
    }

    console.error('GET properties error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create new property (landlord only)
export async function POST(request: NextRequest) {
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
        { error: 'Only landlords can create properties' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = propertySchema.parse(body);

    // Create property
    const property = await prisma.property.create({
      data: {
        ...validatedData,
        amenities: JSON.stringify(validatedData.amenities || []),
        images: JSON.stringify(validatedData.images || []),
        landlordId: session.user.id,
        status: validatedData.status || 'DRAFT',
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

    // Parse JSON fields for response
    const parsedProperty = {
      ...property,
      amenities: JSON.parse(property.amenities),
      images: JSON.parse(property.images),
    };

    return NextResponse.json(
      {
        message: 'Property created successfully',
        property: parsedProperty,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('POST property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
