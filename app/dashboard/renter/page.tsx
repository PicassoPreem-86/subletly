'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface SavedProperty {
  id: string;
  property: {
    id: string;
    title: string;
    city: string;
    state: string;
    monthlyRent: number;
    bedrooms: number;
    bathrooms: number;
    images: string[];
  };
  createdAt: string;
}

interface Inquiry {
  id: string;
  message: string;
  status: string;
  property: {
    id: string;
    title: string;
    city: string;
    state: string;
    monthlyRent: number;
  };
  createdAt: string;
}

export default function RenterDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      fetchData();
    }
  }, [session, status, router]);

  const fetchData = async () => {
    try {
      // Fetch saved properties and inquiries in parallel
      const [savedRes, inquiriesRes] = await Promise.all([
        fetch('/api/saved-properties'),
        fetch('/api/inquiries')
      ]);

      if (savedRes.ok) {
        const savedData = await savedRes.json();
        setSavedProperties(savedData.savedProperties || []);
      }

      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json();
        setInquiries(inquiriesData.inquiries || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
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
            <div className="flex items-center gap-4">
              <Link
                href="/browse"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                Browse Properties
              </Link>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {session.user.firstName} {session.user.lastName}
                </p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user.firstName}!
          </h1>
          <p className="text-gray-600">
            Find your perfect sublet and manage your saved properties
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{savedProperties.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Inquiries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {inquiries.filter(i => i.status === 'PENDING').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{inquiries.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to find your next home?</h2>
              <p className="text-purple-100">
                Browse thousands of verified sublets in NYC and Atlanta
              </p>
            </div>
            <Link
              href="/browse"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Properties
            </Link>
          </div>
        </div>

        {/* Saved Properties Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Saved Properties</h2>
            {savedProperties.length > 0 && (
              <Link
                href="/dashboard/renter/saved"
                className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
              >
                View All →
              </Link>
            )}
          </div>

          {savedProperties.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved properties yet</h3>
              <p className="text-gray-600 mb-6">Start browsing and save your favorites!</p>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.slice(0, 3).map((saved) => (
                <div key={saved.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-500">
                    {saved.property.images && saved.property.images[0] ? (
                      <Image
                        src={saved.property.images[0]}
                        alt={saved.property.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{saved.property.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {saved.property.city}, {saved.property.state}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-purple-600">
                          ${saved.property.monthlyRent.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">/month</p>
                      </div>
                      <Link
                        href={`/properties/${saved.property.id}`}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-center font-medium hover:bg-purple-700 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Inquiries</h2>
            {inquiries.length > 0 && (
              <Link
                href="/dashboard/renter/inquiries"
                className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
              >
                View All →
              </Link>
            )}
          </div>

          {inquiries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No inquiries yet</h3>
              <p className="text-gray-600">When you contact landlords, your inquiries will appear here</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
              {inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{inquiry.property.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          inquiry.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                          inquiry.status === 'RESPONDED' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {inquiry.property.city}, {inquiry.property.state} • ${inquiry.property.monthlyRent.toLocaleString()}/mo
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-2">{inquiry.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Sent {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/properties/${inquiry.property.id}`}
                      className="ml-4 text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      View Property →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
