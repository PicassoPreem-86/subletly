'use client';

import { Check } from 'lucide-react';
import { categorizeAmenities } from '@/lib/utils/propertyHelpers';

interface AmenitiesGridProps {
  amenities: string[];
}

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  if (!amenities || amenities.length === 0) return null;

  const categorized = categorizeAmenities(amenities);
  const categories = [
    { name: 'Basic Amenities', items: categorized.basic },
    { name: 'Appliances', items: categorized.appliances },
    { name: 'Features', items: categorized.features },
    { name: 'Outdoor', items: categorized.outdoor },
    { name: 'Building', items: categorized.building },
  ].filter((cat) => cat.items.length > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>

      <div className="space-y-6">
        {categories.map((category, idx) => (
          <div key={idx}>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.items.map((amenity, amenityIdx) => (
                <div key={amenityIdx} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
