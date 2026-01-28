// NextAuth.js v5 Configuration
import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { AccountType } from '@prisma/client';

// Extend the default session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accountType: AccountType;
      firstName: string;
      lastName: string;
    } & DefaultSession['user'];
  }

  interface User {
    accountType: AccountType;
    firstName: string;
    lastName: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Note: PrismaAdapter and bcrypt are only used during API routes, not in middleware
  // When using JWT strategy, adapter is optional (only needed for OAuth providers)
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        accountType: { label: 'Account Type', type: 'text' }, // RENTER or LANDLORD
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Lazy-load modules only when authorize runs (API routes, not middleware)
        const { prisma } = await import('./prisma');
        const { supabaseAdmin } = await import('./supabase');

        // Step 1: Authenticate with Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (authError || !authData.user) {
          console.error('Supabase Auth login error:', authError?.message);
          return null;
        }

        // Step 2: Fetch user data from database using compound unique (email + accountType)
        // If accountType is provided, use it; otherwise, find any account with this email
        let user;
        if (credentials.accountType && (credentials.accountType === 'RENTER' || credentials.accountType === 'LANDLORD')) {
          // Login with specific account type (compound unique lookup)
          user = await prisma.user.findUnique({
            where: {
              email_accountType: {
                email: credentials.email as string,
                accountType: credentials.accountType as 'RENTER' | 'LANDLORD',
              },
            },
          });
        } else {
          // No account type specified - find the first account with this email
          // This handles backwards compatibility and single-account users
          user = await prisma.user.findFirst({
            where: {
              email: credentials.email as string,
            },
          });
        }

        if (!user) {
          console.error('User not found in database after Supabase Auth success');
          return null;
        }

        console.log('✅ User logged in successfully:');
        console.log('  - Supabase Auth ID:', authData.user.id);
        console.log('  - Email:', user.email);
        console.log('  - Account Type:', user.accountType);

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          accountType: user.accountType,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accountType = user.accountType;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.accountType = token.accountType as AccountType;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    },
  },
});
