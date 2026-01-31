'use client';

import { Property } from '@/types/property';
import { useSimilarProperties } from '@/hooks/useSimilarProperties';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/propertyHelpers';
import { Bed, Bath, MapPin } from 'lucide-react';

interface SimilarPropertiesSectionProps {
  currentProperty: Property;
}

export default function SimilarPropertiesSection({ currentProperty }: SimilarPropertiesSectionProps) {
  const { properties, isLoading } = useSimilarProperties(currentProperty, 6);

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no similar properties found
  if (properties.length === 0) return null;

  return (
    <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48">
                {property.images && property.images.length > 0 ? (
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500" />
                )}
              </div>

              <div className="p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {formatPrice(property.monthlyRent)}
                  </span>
                  <span className="text-sm text-gray-600">/month</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {property.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="line-clamp-1">
                    {property.city}, {property.state}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
