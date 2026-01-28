'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import AccountMenu from './AccountMenu';

interface HeaderProps {
  variant?: 'light' | 'transparent';
}

export default function Header({ variant = 'light' }: HeaderProps) {
  const { data: session, status } = useSession();

  const bgClass = variant === 'transparent'
    ? 'bg-white/95 backdrop-blur-sm'
    : 'bg-white shadow-sm';

  return (
    <header className={bgClass}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/subletly-logo.png"
              alt="Subletly"
              width={400}
              height={100}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              How It Works
            </Link>
            {session?.user?.accountType === 'LANDLORD' && (
              <Link
                href="/dashboard/landlord/properties/new"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                List Property
              </Link>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {status === 'loading' ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session?.user ? (
              <AccountMenu session={session} />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
