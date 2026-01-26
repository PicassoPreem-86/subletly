'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    city: string;
    state: string;
    monthlyRent: number;
    bedrooms: number;
    bathrooms: number;
    propertyType: string;
    images: string[];
    availableFrom: string;
    availableTo: string;
    furnished?: boolean;
    petsAllowed?: boolean;
  };
  isSaved?: boolean;
  onSaveToggle?: (propertyId: string, isSaved: boolean) => void;
  showSaveButton?: boolean;
}

export default function PropertyCard({
  property,
  isSaved = false,
  onSaveToggle,
  showSaveButton = true,
}: PropertyCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Images are now native arrays from PostgreSQL
  const images = property.images || [];
  const mainImage = images[0] || null;

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      router.push('/login');
      return;
    }

    setIsSaving(true);

    try {
      if (isSaved) {
        // Unsave the property
        const response = await fetch(`/api/saved-properties?propertyId=${property.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onSaveToggle?.(property.id, false);
        }
      } else {
        // Save the property
        const response = await fetch('/api/saved-properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ propertyId: property.id }),
        });

        if (response.ok) {
          onSaveToggle?.(property.id, true);
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/properties/${property.id}`}>
        {/* Image Section */}
        <div className="relative h-56 bg-gradient-to-br from-purple-400 to-pink-500">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={property.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          )}

          {/* Save Button */}
          {showSaveButton && (
            <button
              onClick={handleSaveClick}
              disabled={isSaving}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                isSaved
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-white'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg
                className="w-5 h-5"
                fill={isSaved ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}

          {/* Property Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 text-gray-900 rounded-full text-xs font-semibold">
              {property.propertyType}
            </span>
          </div>

          {/* Image Count */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4">
              <span className="px-2 py-1 bg-black/60 text-white rounded-md text-xs font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">
              {property.city}, {property.state}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {property.bedrooms} bed
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              {property.bathrooms} bath
            </div>
          </div>

          {/* Amenities */}
          <div className="flex gap-2 mb-4">
            {property.furnished && (
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                Furnished
              </span>
            )}
            {property.petsAllowed && (
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                Pets OK
              </span>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-2xl font-bold text-purple-600">
                ${property.monthlyRent.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">/month</p>
            </div>
            <div
              className={`px-4 py-2 bg-purple-600 text-white rounded-lg font-medium transition-all ${
                isHovered ? 'bg-purple-700 shadow-lg' : ''
              }`}
            >
              View Details
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
