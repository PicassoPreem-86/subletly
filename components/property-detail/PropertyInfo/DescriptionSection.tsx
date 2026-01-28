'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DescriptionSectionProps {
  description: string;
  maxLength?: number;
}

export default function DescriptionSection({
  description,
  maxLength = 400,
}: DescriptionSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = description.length > maxLength;
  const displayText =
    expanded || !shouldTruncate
      ? description
      : description.substring(0, maxLength) + '...';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>

      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {displayText}
        </p>
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          {expanded ? (
            <>
              Show less
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
