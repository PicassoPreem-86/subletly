// Seed script to create test data for messaging system
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding messaging test data...\n');

  // Find the renter (current logged in user)
  const renter = await prisma.user.findFirst({
    where: { accountType: 'RENTER' },
  });

  if (!renter) {
    console.error('❌ No renter found. Please create a renter account first.');
    return;
  }
  console.log(`✅ Found renter: ${renter.firstName} ${renter.lastName} (${renter.email})`);

  // Check if we already have a landlord
  let landlord = await prisma.user.findFirst({
    where: { accountType: 'LANDLORD' },
  });

  if (!landlord) {
    // Create a test landlord
    landlord = await prisma.user.create({
      data: {
        email: 'landlord@test.com',
        password: '$2a$10$placeholder', // Won't be used for login
        firstName: 'Sarah',
        lastName: 'Johnson',
        accountType: 'LANDLORD',
        phone: '555-123-4567',
        bio: 'Experienced property manager with 5+ years in NYC rentals.',
        verified: true,
        verifiedAt: new Date(),
      },
    });
    console.log(`✅ Created landlord: ${landlord.firstName} ${landlord.lastName}`);
  } else {
    console.log(`✅ Found existing landlord: ${landlord.firstName} ${landlord.lastName} (${landlord.email})`);
  }

  // Check if landlord has a property
  let property = await prisma.property.findFirst({
    where: { landlordId: landlord.id },
  });

  if (!property) {
    // Create a test property
    property = await prisma.property.create({
      data: {
        title: 'Sunny 2BR in East Village',
        description: 'Beautiful sun-drenched 2 bedroom apartment in the heart of East Village. Walking distance to Tompkins Square Park, great restaurants, and nightlife. Recently renovated with modern kitchen and in-unit washer/dryer.',
        propertyType: 'APARTMENT',
        status: 'ACTIVE',
        address: '123 E 7th Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        neighborhood: 'East Village',
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 850,
        furnished: true,
        monthlyRent: 3500,
        deposit: 3500,
        utilities: false,
        availableFrom: new Date(),
        availableTo: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
        minStay: 3,
        amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Washer/Dryer', 'Dishwasher', 'Hardwood Floors']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        ]),
        petsAllowed: false,
        smoking: false,
        parking: false,
        landlordId: landlord.id,
        views: 42,
      },
    });
    console.log(`✅ Created property: ${property.title}`);
  } else {
    console.log(`✅ Found existing property: ${property.title}`);
  }

  // Check if there's already an inquiry from this renter for this property
  let inquiry = await prisma.inquiry.findFirst({
    where: {
      renterId: renter.id,
      propertyId: property.id,
    },
  });

  if (!inquiry) {
    // Create an inquiry from renter to landlord
    inquiry = await prisma.inquiry.create({
      data: {
        renterId: renter.id,
        propertyId: property.id,
        message: "Hi! I'm very interested in your East Village apartment. I'm a young professional relocating to NYC for work and looking for a 3-6 month sublet starting next month. The location is perfect for my office. Would love to schedule a viewing if possible!",
        phone: '555-987-6543',
        moveInDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
        status: 'PENDING',
        lastMessageAt: new Date(),
      },
    });
    console.log(`✅ Created inquiry from ${renter.firstName} to ${landlord.firstName}`);
  } else {
    console.log(`✅ Found existing inquiry`);
  }

  // Add a reply from the landlord
  const existingMessages = await prisma.message.count({
    where: { inquiryId: inquiry.id },
  });

  if (existingMessages === 0) {
    // Add landlord reply
    await prisma.message.create({
      data: {
        inquiryId: inquiry.id,
        senderId: landlord.id,
        content: "Hi! Thank you for your interest in the apartment. It sounds like you'd be a great fit! I'm available for viewings this weekend - would Saturday at 2pm or Sunday at 11am work for you? The apartment is even better in person!",
      },
    });

    // Update inquiry status
    await prisma.inquiry.update({
      where: { id: inquiry.id },
      data: {
        status: 'RESPONDED',
        lastMessageAt: new Date(),
      },
    });
    console.log(`✅ Added landlord reply to inquiry`);
  } else {
    console.log(`✅ Inquiry already has ${existingMessages} message(s)`);
  }

  console.log('\n🎉 Seed complete!\n');
  console.log('Test accounts:');
  console.log(`  Renter: ${renter.email}`);
  console.log(`  Landlord: ${landlord.email}`);
  console.log(`\nTo test:`);
  console.log(`  1. As renter, go to /dashboard/renter/inquiries to see and reply`);
  console.log(`  2. Sign out and sign in as landlord to see their inbox`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
