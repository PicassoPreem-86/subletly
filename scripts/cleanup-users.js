require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteTestUsers() {
  try {
    console.log('🗑️  Deleting test users...\n');

    // Delete ALL users from database
    const result = await prisma.user.deleteMany({});

    console.log('✅ Deleted', result.count, 'test users');

    // Show remaining users
    const remaining = await prisma.user.findMany({
      select: {
        email: true,
        accountType: true,
        createdAt: true,
      }
    });

    console.log('\n📊 Remaining users in Supabase:', remaining.length);
    if (remaining.length > 0) {
      remaining.forEach(u => {
        console.log('  -', u.email, '(' + u.accountType + ')');
      });
    } else {
      console.log('  ✨ Database is now empty - ready for fresh signups!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

deleteTestUsers();
