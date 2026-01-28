'use client';

import { Property } from '@/types/property';
import { Home, Bed, Bath, Maximize2 } from 'lucide-react';
import { formatSquareFeet, getPropertyTypeLabel } from '@/lib/utils/propertyHelpers';

interface KeyFeaturesCardProps {
  property: Property;
}

export default function KeyFeaturesCard({ property }: KeyFeaturesCardProps) {
  const features = [
    {
      icon: <Bed className="w-6 h-6" />,
      label: 'Bedrooms',
      value: property.bedrooms,
    },
    {
      icon: <Bath className="w-6 h-6" />,
      label: 'Bathrooms',
      value: property.bathrooms,
    },
    {
      icon: <Maximize2 className="w-6 h-6" />,
      label: 'Square Feet',
      value: formatSquareFeet(property.squareFeet),
    },
    {
      icon: <Home className="w-6 h-6" />,
      label: 'Property Type',
      value: getPropertyTypeLabel(property.propertyType),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="text-purple-600 mb-2">{feature.icon}</div>
            <p className="text-2xl font-bold text-gray-900">{feature.value}</p>
            <p className="text-sm text-gray-600 mt-1">{feature.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
