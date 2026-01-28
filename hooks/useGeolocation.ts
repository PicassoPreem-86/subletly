import { useState, useEffect } from 'react';
import { GeocodeResult } from '@/types/property';

interface UseGeolocationReturn {
  coordinates: GeocodeResult | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for geocoding addresses using Nominatim (OpenStreetMap)
 * Caches results in localStorage to avoid repeated API calls
 */
export function useGeolocation(address: string): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<GeocodeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      if (!address) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Check localStorage cache first
        const cacheKey = `geocode_${address}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          setCoordinates(JSON.parse(cached));
          setIsLoading(false);
          return;
        }

        // Use Nominatim API (OpenStreetMap)
        const encodedAddress = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Subletly Property Finder', // Required by Nominatim
          },
        });

        if (!response.ok) {
          throw new Error('Geocoding failed');
        }

        const data = await response.json();

        if (data && data.length > 0) {
          const result: GeocodeResult = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            displayName: data[0].display_name,
          };

          // Cache the result
          localStorage.setItem(cacheKey, JSON.stringify(result));
          setCoordinates(result);
        } else {
          setError('Location not found');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Geocoding error';
        setError(message);
        console.error('Geocoding error:', err);

        // Fallback: Try to use city name only
        const city = address.split(',')[1]?.trim();
        if (city) {
          try {
            const encodedCity = encodeURIComponent(city);
            const fallbackUrl = `https://nominatim.openstreetmap.org/search?q=${encodedCity}&format=json&limit=1`;

            const fallbackResponse = await fetch(fallbackUrl, {
              headers: {
                'User-Agent': 'Subletly Property Finder',
              },
            });

            const fallbackData = await fallbackResponse.json();

            if (fallbackData && fallbackData.length > 0) {
              const result: GeocodeResult = {
                lat: parseFloat(fallbackData[0].lat),
                lng: parseFloat(fallbackData[0].lon),
                displayName: fallbackData[0].display_name,
              };

              setCoordinates(result);
              setError(null);
            }
          } catch (fallbackErr) {
            console.error('Fallback geocoding failed:', fallbackErr);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    geocodeAddress();
  }, [address]);

  return {
    coordinates,
    isLoading,
    error,
  };
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}
