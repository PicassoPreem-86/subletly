'use client';

import { UseFormWatch } from 'react-hook-form';
import { PropertyFormData } from '../PropertyForm';
import Image from 'next/image';

interface ReviewStepProps {
  watch: UseFormWatch<PropertyFormData>;
  mode: 'create' | 'edit';
}

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  APARTMENT: 'Apartment',
  HOUSE: 'House',
  CONDO: 'Condo',
  STUDIO: 'Studio',
  ROOM: 'Room',
};

export default function ReviewStep({ watch, mode }: ReviewStepProps) {
  const data = watch();

  const formatDate = (dateStr: string | Date | undefined) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Review Your Listing</h2>
        <p className="text-gray-600">
          {mode === 'create'
            ? 'Please review the details before saving your listing'
            : 'Review your changes before saving'
          }
        </p>
      </div>

      {/* Preview Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Images Preview */}
        <div className="relative h-64 bg-gradient-to-br from-purple-400 to-pink-500">
          {data.images && data.images.length > 0 ? (
            <Image
              src={data.images[0]}
              alt={data.title || 'Property'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm opacity-75">No photos added</p>
              </div>
            </div>
          )}

          {/* Image Count */}
          {data.images && data.images.length > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white rounded-lg text-sm font-medium">
              {data.images.length} photos
            </div>
          )}

          {/* Property Type Badge */}
          {data.propertyType && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-gray-900 rounded-full text-sm font-medium">
              {PROPERTY_TYPE_LABELS[data.propertyType] || data.propertyType}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {data.title || 'Untitled Listing'}
          </h3>

          <div className="flex items-center text-gray-600 mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {data.city || '—'}, {data.state || '—'}
              {data.neighborhood && ` · ${data.neighborhood}`}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6 text-gray-600">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {data.bedrooms ?? 0} bed
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {data.bathrooms ?? 0} bath
            </span>
            {data.squareFeet && (
              <span>{data.squareFeet.toLocaleString()} sq ft</span>
            )}
          </div>

          <div className="text-3xl font-bold text-purple-600">
            ${data.monthlyRent?.toLocaleString() || '0'}
            <span className="text-base font-normal text-gray-500">/month</span>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Location
          </h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Address:</span> {data.address || '—'}</p>
            <p><span className="text-gray-500">City:</span> {data.city || '—'}</p>
            <p><span className="text-gray-500">State:</span> {data.state || '—'}</p>
            <p><span className="text-gray-500">ZIP:</span> {data.zipCode || '—'}</p>
            {data.neighborhood && (
              <p><span className="text-gray-500">Neighborhood:</span> {data.neighborhood}</p>
            )}
          </div>
        </div>

        {/* Pricing & Availability */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pricing & Availability
          </h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Monthly Rent:</span> ${data.monthlyRent?.toLocaleString() || '—'}</p>
            <p><span className="text-gray-500">Security Deposit:</span> {data.deposit ? `$${data.deposit.toLocaleString()}` : 'Not specified'}</p>
            <p><span className="text-gray-500">Utilities:</span> {data.utilities ? 'Included' : 'Not included'}</p>
            <p><span className="text-gray-500">Available From:</span> {formatDate(data.availableFrom)}</p>
            <p><span className="text-gray-500">Available Until:</span> {formatDate(data.availableTo)}</p>
            {data.minStay && (
              <p><span className="text-gray-500">Minimum Stay:</span> {data.minStay} months</p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.furnished && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Furnished</span>
            )}
            {data.petsAllowed && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Pets OK</span>
            )}
            {data.parking && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Parking</span>
            )}
            {data.smoking && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Smoking OK</span>
            )}
            {!data.furnished && !data.petsAllowed && !data.parking && !data.smoking && (
              <span className="text-sm text-gray-500">No special features selected</span>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Amenities
          </h4>
          {data.amenities && data.amenities.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((amenity, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No amenities selected</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Description
        </h4>
        <p className="text-gray-700 whitespace-pre-wrap">
          {data.description || 'No description provided'}
        </p>
      </div>

      {/* Submit Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-yellow-800">Before you publish</p>
            <p className="text-sm text-yellow-700 mt-1">
              {mode === 'create'
                ? 'You can save as a draft to finish later, or submit for review to go live. Our team reviews listings within 24 hours.'
                : 'Your changes will be saved immediately. If you change the status to "Submit for Review", our team will review it within 24 hours.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
