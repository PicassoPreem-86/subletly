import { useState, useEffect } from 'react';
import { Property, PropertyFilters } from '@/types/property';
import { calculatePriceRange } from '@/lib/utils/propertyHelpers';

interface UseSimilarPropertiesReturn {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching similar properties
 * Filters by: same city, ±20% price range, same property type
 */
export function useSimilarProperties(
  currentProperty: Property | null,
  limit: number = 6
): UseSimilarPropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      if (!currentProperty) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Calculate price range (±20%)
        const priceRange = calculatePriceRange(currentProperty.monthlyRent);

        // Build query params
        const params = new URLSearchParams({
          city: currentProperty.city,
          minPrice: priceRange.min.toString(),
          maxPrice: priceRange.max.toString(),
          propertyType: currentProperty.propertyType,
          limit: (limit + 1).toString(), // Fetch one extra to exclude current property
        });

        const response = await fetch(`/api/properties?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch similar properties');
        }

        const data = await response.json();

        // Filter out current property and limit results
        const filtered = data.properties
          .filter((p: Property) => p.id !== currentProperty.id)
          .slice(0, limit);

        setProperties(filtered);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
        console.error('Failed to fetch similar properties:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarProperties();
  }, [currentProperty, limit]);

  return {
    properties,
    isLoading,
    error,
  };
}
