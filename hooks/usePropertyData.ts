import { useState, useEffect } from 'react';
import { Property, SavedProperty } from '@/types/property';

interface UsePropertyDataReturn {
  property: Property | null;
  isSaved: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  toggleSave: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing property data
 */
export function usePropertyData(
  propertyId: string,
  userId?: string
): UsePropertyDataReturn {
  const [property, setProperty] = useState<Property | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/properties/${propertyId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch property');
      }

      const data = await response.json();
      setProperty(data);

      // Increment view count
      await fetch(`/api/properties/${propertyId}/view`, { method: 'POST' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Failed to fetch property:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfSaved = async () => {
    if (!userId) return;

    try {
      const response = await fetch('/api/saved-properties');
      const data = await response.json();
      const savedIds =
        data.savedProperties?.map((sp: SavedProperty) => sp.property.id) || [];
      setIsSaved(savedIds.includes(propertyId));
    } catch (err) {
      console.error('Failed to check saved status:', err);
    }
  };

  const toggleSave = async () => {
    if (!userId) {
      throw new Error('User must be logged in to save properties');
    }

    try {
      if (isSaved) {
        await fetch(`/api/saved-properties?propertyId=${propertyId}`, {
          method: 'DELETE',
        });
        setIsSaved(false);
      } else {
        await fetch('/api/saved-properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ propertyId }),
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error toggling save:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProperty();
    if (userId) {
      checkIfSaved();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId, userId]);

  return {
    property,
    isSaved,
    isLoading,
    error,
    refetch: fetchProperty,
    toggleSave,
  };
}
