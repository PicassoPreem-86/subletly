'use client';

import Link from 'next/link';
import { Property } from '@/types/property';
import { ChevronRight } from 'lucide-react';

interface PropertyBreadcrumbsProps {
  property: Property;
}

export default function PropertyBreadcrumbs({ property }: PropertyBreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-purple-600 transition-colors">
        Home
      </Link>

      <ChevronRight className="w-4 h-4 mx-2" />

      <Link href="/browse" className="hover:text-purple-600 transition-colors">
        Browse
      </Link>

      <ChevronRight className="w-4 h-4 mx-2" />

      <Link
        href={`/browse?city=${encodeURIComponent(property.city)}`}
        className="hover:text-purple-600 transition-colors"
      >
        {property.city}
      </Link>

      <ChevronRight className="w-4 h-4 mx-2" />

      <span className="text-gray-900 font-medium truncate max-w-[200px]">
        {property.title}
      </span>
    </nav>
  );
}
