'use client';

import { Property } from '@/types/property';
import { extractPropertyHighlights } from '@/lib/utils/propertyHelpers';

interface PropertyHighlightsProps {
  property: Property;
}

export default function PropertyHighlights({ property }: PropertyHighlightsProps) {
  const highlights = extractPropertyHighlights(property);

  if (highlights.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {highlights.map((highlight, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
          >
            <span className="text-2xl">{highlight.icon}</span>
            <div>
              <p className="font-medium text-gray-900 text-sm">{highlight.label}</p>
              {typeof highlight.value === 'string' && highlight.value !== 'true' && (
                <p className="text-xs text-gray-600">{highlight.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
