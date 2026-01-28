'use client';

import { Property } from '@/types/property';
import { MapPin } from 'lucide-react';
import ShareButton from './ShareButton';
import PropertyBreadcrumbs from './PropertyBreadcrumbs';

interface PropertyHeaderProps {
  property: Property;
  isSaved: boolean;
  onSaveToggle: () => void;
}

export default function PropertyHeader({ property, isSaved, onSaveToggle }: PropertyHeaderProps) {
  return (
    <div className="mb-6">
      <PropertyBreadcrumbs property={property} />

      <div className="flex items-start justify-between mt-4">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {property.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-1.5" />
              <span>
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </span>
            </div>

            {property.neighborhood && (
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {property.neighborhood}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <ShareButton property={property} />

          <button
            onClick={onSaveToggle}
            className={`p-3 rounded-full transition-all ${
              isSaved
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save property'}
          >
            <svg
              className="w-6 h-6"
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
        </div>
      </div>
    </div>
  );
}
