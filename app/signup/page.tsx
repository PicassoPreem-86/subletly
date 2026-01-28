'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SignUpLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
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
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Already have an account? <span className="text-purple-600">Log In</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Join Subletly
              </h1>
              <p className="text-gray-600">
                Choose how you want to use Subletly
              </p>
            </div>

            {/* Account Type Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Renter Option */}
              <Link
                href="/signup/renter"
                className="group p-6 rounded-xl border-2 border-gray-200 hover:border-purple-600 transition-all hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  I&apos;m a Renter
                </h2>
                <p className="text-gray-600 mb-4">
                  Find your perfect sublet from verified landlords. Save favorites, contact hosts, and manage your rental search.
                </p>
                <div className="flex items-center text-purple-600 font-medium">
                  Sign up as Renter
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>

              {/* Landlord Option */}
              <Link
                href="/signup/landlord"
                className="group p-6 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-all hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  I&apos;m a Landlord
                </h2>
                <p className="text-gray-600 mb-4">
                  List your property and find reliable renters. Manage listings, respond to inquiries, and track views.
                </p>
                <div className="flex items-center text-teal-600 font-medium">
                  Sign up as Landlord
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Info Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium">Note:</span> You can create both a Renter and Landlord account using the same email address. They will be separate accounts with different dashboards.
              </p>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-700 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
