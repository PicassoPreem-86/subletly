'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

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

export default function SavedPropertiesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      if (session.user.accountType !== 'RENTER') {
        router.push('/dashboard/landlord');
        return;
      }
      fetchSavedProperties();
    }
  }, [session, status, router]);

  const fetchSavedProperties = async () => {
    try {
      const response = await fetch('/api/saved-properties');
      if (response.ok) {
        const data = await response.json();
        setSavedProperties(data.savedProperties || []);
      }
    } catch (error) {
      console.error('Failed to fetch saved properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsave = async (savedPropertyId: string, propertyId: string) => {
    setRemovingId(savedPropertyId);
    try {
      const response = await fetch(`/api/saved-properties?propertyId=${propertyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSavedProperties(savedProperties.filter(sp => sp.id !== savedPropertyId));
      } else {
        console.error('Failed to unsave property');
      }
    } catch (error) {
      console.error('Error unsaving property:', error);
    } finally {
      setRemovingId(null);
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

  if (!session?.user || session.user.accountType !== 'RENTER') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/renter"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Saved Properties</h1>
          </div>
          <p className="text-gray-600">
            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {/* Saved Properties Grid */}
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
            {savedProperties.map((saved) => (
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
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleUnsave(saved.id, saved.property.id)}
                      disabled={removingId === saved.id}
                      className="bg-white/95 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors disabled:opacity-50"
                      aria-label="Remove from saved"
                    >
                      {removingId === saved.id ? (
                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{saved.property.title}</h3>
                  <p className="text-gray-600 mb-1">
                    {saved.property.city}, {saved.property.state}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {saved.property.bedrooms} bed • {saved.property.bathrooms} bath
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
                  <p className="text-xs text-gray-400 mt-4">
                    Saved {new Date(saved.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
