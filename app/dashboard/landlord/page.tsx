'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { TRUST_DEFINITIONS, PropertyStatusKey } from '@/lib/constants/trustDefinitions';
import InfoTooltip from '@/components/ui/InfoTooltip';

interface Property {
  id: string;
  title: string;
  city: string;
  state: string;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  views: number;
  images: string[];
  createdAt: string;
}

interface InquiryPreview {
  id: string;
  status: string;
  createdAt: string;
  unreadCount: number;
  renter: {
    firstName: string;
    lastName: string;
  };
  property: {
    title: string;
  };
}

export default function LandlordDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<InquiryPreview[]>([]);
  const [totalUnread, setTotalUnread] = useState(0);
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
      const [propertiesRes, inquiriesRes] = await Promise.all([
        fetch('/api/properties/my-listings'),
        fetch('/api/landlord/inquiries'),
      ]);

      const propertiesData = await propertiesRes.json();
      setProperties(propertiesData.properties || []);

      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json();
        setInquiries(inquiriesData.inquiries?.slice(0, 5) || []);
        setTotalUnread(inquiriesData.totalUnread || 0);
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
            Manage your property listings and track inquiries
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{properties.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {properties.filter(p => p.status === 'ACTIVE').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {properties.reduce((sum, p) => sum + p.views, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <Link href="/dashboard/landlord/inquiries" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inquiries</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
                  {totalUnread > 0 && (
                    <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
                      {totalUnread} new
                    </span>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Listing Status Guide */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Listing Status Guide
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {(Object.keys(TRUST_DEFINITIONS.listingStatus) as PropertyStatusKey[]).map((statusKey) => {
              const statusDef = TRUST_DEFINITIONS.listingStatus[statusKey];
              const colorClasses: Record<string, string> = {
                gray: 'bg-gray-100 border-gray-200 text-gray-700',
                yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
                green: 'bg-green-50 border-green-200 text-green-700',
                blue: 'bg-blue-50 border-blue-200 text-blue-700',
                red: 'bg-red-50 border-red-200 text-red-700',
              };
              return (
                <div
                  key={statusKey}
                  className={`p-3 rounded-lg border ${colorClasses[statusDef.color]} flex flex-col`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm font-semibold">{statusDef.label}</span>
                    <InfoTooltip content={statusDef.description} size="sm" />
                  </div>
                  <p className="text-xs opacity-80 line-clamp-2">{statusDef.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Recent Inquiries
              {totalUnread > 0 && (
                <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
                  {totalUnread} unread
                </span>
              )}
            </h3>
            {inquiries.length > 0 && (
              <Link
                href="/dashboard/landlord/inquiries"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View All →
              </Link>
            )}
          </div>
          {inquiries.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">No inquiries yet</p>
              <p className="text-sm text-gray-500 mt-1">
                When renters express interest in your properties, their inquiries will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {inquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/dashboard/landlord/inquiries/${inquiry.id}`}
                  className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center relative">
                      <span className="text-purple-600 font-semibold text-sm">
                        {inquiry.renter.firstName.charAt(0)}{inquiry.renter.lastName.charAt(0)}
                      </span>
                      {inquiry.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{inquiry.unreadCount}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${inquiry.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                        {inquiry.renter.firstName} {inquiry.renter.lastName}
                      </p>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {inquiry.property.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inquiry.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      inquiry.status === 'RESPONDED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {inquiry.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
          <Link
            href="/dashboard/landlord/properties/new"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Property
          </Link>
        </div>

        {/* Properties List */}
        {properties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties yet</h3>
            <p className="text-gray-600 mb-6">Get started by listing your first property!</p>
            <Link
              href="/dashboard/landlord/properties/new"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-500">
                  {property.images.length > 0 && property.images[0] ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute top-4 right-4">
                    {(() => {
                      const statusKey = property.status as PropertyStatusKey;
                      const statusDef = TRUST_DEFINITIONS.listingStatus[statusKey];
                      const colorClasses: Record<string, string> = {
                        gray: 'bg-gray-100 text-gray-700',
                        yellow: 'bg-yellow-100 text-yellow-700',
                        green: 'bg-green-100 text-green-700',
                        blue: 'bg-blue-100 text-blue-700',
                        red: 'bg-red-100 text-red-700',
                      };
                      return (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${colorClasses[statusDef?.color || 'gray']}`}>
                          {statusDef?.label || property.status}
                          {statusDef && (
                            <InfoTooltip content={statusDef.description} size="sm" />
                          )}
                        </span>
                      );
                    })()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {property.city}, {property.state}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">${property.monthlyRent.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">/month</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{property.bedrooms} bed • {property.bathrooms} bath</p>
                      <p className="text-xs mt-1">{property.views} views</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/landlord/properties/${property.id}/edit`}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/properties/${property.id}`}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-center font-medium hover:bg-purple-700 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
