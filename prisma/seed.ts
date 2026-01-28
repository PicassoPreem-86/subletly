import { PrismaClient, PropertyType, PropertyStatus, AccountType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample landlord user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const landlord = await prisma.user.upsert({
    where: {
      email_accountType: {
        email: 'landlord@subletly.com',
        accountType: AccountType.LANDLORD
      }
    },
    update: {},
    create: {
      email: 'landlord@subletly.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Landlord',
      phone: '+1-555-0100',
      accountType: AccountType.LANDLORD,
      verified: true,
      verifiedAt: new Date(),
    },
  });

  console.log('✓ Created landlord user');

  // Sample properties data
  const properties = [
    {
      title: 'Modern Studio in Downtown Manhattan',
      description: 'Bright and modern studio apartment in the heart of Manhattan. Perfect for young professionals. Walking distance to subway, restaurants, and nightlife. Fully furnished with high-speed internet included.',
      propertyType: PropertyType.STUDIO,
      status: PropertyStatus.ACTIVE,
      address: '123 Broadway',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      neighborhood: 'Financial District',
      bedrooms: 0,
      bathrooms: 1,
      squareFeet: 450,
      furnished: true,
      monthlyRent: 2800,
      deposit: 2800,
      utilities: true,
      availableFrom: new Date('2024-03-01'),
      availableTo: new Date('2024-08-31'),
      minStay: 3,
      amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Dishwasher', 'Elevator', 'Laundry in Building']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260066-6bc358109f3e?w=800',
      ]),
      petsAllowed: false,
      smoking: false,
      parking: false,
    },
    {
      title: 'Spacious 2BR Apartment in Brooklyn',
      description: 'Charming 2-bedroom apartment in trendy Williamsburg. Features exposed brick, hardwood floors, and large windows. Close to L train, cafes, and Brooklyn Bridge Park.',
      propertyType: PropertyType.APARTMENT,
      status: PropertyStatus.ACTIVE,
      address: '456 Bedford Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11249',
      neighborhood: 'Williamsburg',
      bedrooms: 2,
      bathrooms: 1.5,
      squareFeet: 950,
      furnished: false,
      monthlyRent: 3200,
      deposit: 3200,
      utilities: false,
      availableFrom: new Date('2024-02-15'),
      availableTo: new Date('2024-07-15'),
      minStay: 4,
      amenities: JSON.stringify(['WiFi', 'Hardwood Floors', 'Exposed Brick', 'Dishwasher', 'Bike Storage']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      ]),
      petsAllowed: true,
      smoking: false,
      parking: false,
    },
    {
      title: 'Luxury 3BR House in San Francisco',
      description: 'Beautiful Victorian house in Pacific Heights. Features include gourmet kitchen, private backyard, and stunning city views. Perfect for families or roommates.',
      propertyType: PropertyType.HOUSE,
      status: PropertyStatus.ACTIVE,
      address: '789 Pacific Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94109',
      neighborhood: 'Pacific Heights',
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 2200,
      furnished: true,
      monthlyRent: 6500,
      deposit: 6500,
      utilities: false,
      availableFrom: new Date('2024-04-01'),
      availableTo: new Date('2024-09-30'),
      minStay: 6,
      amenities: JSON.stringify(['WiFi', 'Backyard', 'Fireplace', 'Washer/Dryer', 'Garage', 'City Views']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      ]),
      petsAllowed: true,
      smoking: false,
      parking: true,
    },
    {
      title: 'Cozy 1BR Condo in Austin',
      description: 'Modern 1-bedroom condo in South Congress. Features include pool access, gym, and rooftop terrace. Walking distance to best restaurants and live music venues.',
      propertyType: PropertyType.CONDO,
      status: PropertyStatus.ACTIVE,
      address: '321 South Congress Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      neighborhood: 'South Congress',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 720,
      furnished: true,
      monthlyRent: 1850,
      deposit: 1850,
      utilities: true,
      availableFrom: new Date('2024-03-15'),
      availableTo: new Date('2024-08-15'),
      minStay: 3,
      amenities: JSON.stringify(['WiFi', 'Pool', 'Gym', 'Rooftop Terrace', 'Concierge', 'AC']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      ]),
      petsAllowed: false,
      smoking: false,
      parking: true,
    },
    {
      title: 'Private Room in Shared House - Boston',
      description: 'Large bedroom in shared house near Boston University. Shared kitchen and living room with 2 other roommates. Great for students or young professionals.',
      propertyType: PropertyType.ROOM,
      status: PropertyStatus.ACTIVE,
      address: '555 Commonwealth Ave',
      city: 'Boston',
      state: 'MA',
      zipCode: '02215',
      neighborhood: 'Allston',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 200,
      furnished: true,
      monthlyRent: 1200,
      deposit: 1200,
      utilities: true,
      availableFrom: new Date('2024-02-01'),
      availableTo: new Date('2024-06-30'),
      minStay: 2,
      amenities: JSON.stringify(['WiFi', 'Shared Kitchen', 'Laundry', 'Backyard', 'Near Public Transit']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
      ]),
      petsAllowed: false,
      smoking: false,
      parking: false,
    },
    {
      title: 'Beachfront 2BR Apartment in Miami',
      description: 'Stunning ocean view apartment in South Beach. Features include balcony overlooking the ocean, modern kitchen, and building amenities. Steps from the beach!',
      propertyType: PropertyType.APARTMENT,
      status: PropertyStatus.ACTIVE,
      address: '1000 Ocean Drive',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33139',
      neighborhood: 'South Beach',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1100,
      furnished: true,
      monthlyRent: 4200,
      deposit: 4200,
      utilities: false,
      availableFrom: new Date('2024-05-01'),
      availableTo: new Date('2024-10-31'),
      minStay: 4,
      amenities: JSON.stringify(['WiFi', 'Ocean View', 'Balcony', 'Pool', 'Gym', 'Beach Access', 'Parking']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
        'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800',
      ]),
      petsAllowed: true,
      smoking: false,
      parking: true,
    },
    {
      title: 'Affordable Studio near University of Chicago',
      description: 'Perfect for students! Cozy studio near UChicago campus. Includes utilities and WiFi. Quiet building with laundry facilities.',
      propertyType: PropertyType.STUDIO,
      status: PropertyStatus.ACTIVE,
      address: '789 E 60th St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60637',
      neighborhood: 'Hyde Park',
      bedrooms: 0,
      bathrooms: 1,
      squareFeet: 380,
      furnished: true,
      monthlyRent: 1350,
      deposit: 1350,
      utilities: true,
      availableFrom: new Date('2024-03-01'),
      availableTo: new Date('2024-08-31'),
      minStay: 3,
      amenities: JSON.stringify(['WiFi', 'Laundry', 'Heat Included', 'Near Campus', 'Quiet']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      ]),
      petsAllowed: false,
      smoking: false,
      parking: false,
    },
    {
      title: 'Downtown Seattle 1BR with City Views',
      description: 'High-rise apartment with stunning views of downtown Seattle and Puget Sound. Modern amenities, doorman building, walking distance to Pike Place Market.',
      propertyType: PropertyType.APARTMENT,
      status: PropertyStatus.ACTIVE,
      address: '1500 4th Ave',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      neighborhood: 'Downtown',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 680,
      furnished: false,
      monthlyRent: 2600,
      deposit: 2600,
      utilities: false,
      availableFrom: new Date('2024-04-01'),
      availableTo: new Date('2024-09-30'),
      minStay: 3,
      amenities: JSON.stringify(['WiFi', 'City Views', 'Doorman', 'Gym', 'Rooftop Deck', 'Bike Storage']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800',
      ]),
      petsAllowed: false,
      smoking: false,
      parking: true,
    },
  ];

  // Create all properties
  for (const propertyData of properties) {
    await prisma.property.create({
      data: {
        ...propertyData,
        landlordId: landlord.id,
      },
    });
  }

  console.log(`✓ Created ${properties.length} sample properties`);
  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
