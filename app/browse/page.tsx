'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyCard from '@/components/PropertyCard';

interface Property {
  id: string;
  title: string;
  city: string;
  state: string;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  images: string[];
  availableFrom: string;
  availableTo: string;
  furnished: boolean;
  petsAllowed: boolean;
}

interface SavedProperty {
  property: {
    id: string;
  };
}

export default function BrowsePage() {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [savedPropertyIds, setSavedPropertyIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [cityFilter, setCityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [furnishedFilter, setFurnishedFilter] = useState<boolean | null>(null);
  const [petsAllowedFilter, setPetsAllowedFilter] = useState<boolean | null>(null);

  useEffect(() => {
    fetchProperties();
    if (session?.user) {
      fetchSavedProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    applyFilters();
  }, [
    properties,
    cityFilter,
    stateFilter,
    minPrice,
    maxPrice,
    bedroomsFilter,
    propertyTypeFilter,
    furnishedFilter,
    petsAllowedFilter,
  ]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data.data || []);
      setFilteredProperties(data.data || []);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedProperties = async () => {
    try {
      const response = await fetch('/api/saved-properties');
      const data = await response.json();
      const savedIds = new Set<string>(
        data.savedProperties?.map((sp: SavedProperty) => sp.property.id) || []
      );
      setSavedPropertyIds(savedIds);
    } catch (error) {
      console.error('Failed to fetch saved properties:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // City filter
    if (cityFilter) {
      filtered = filtered.filter((p) =>
        p.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    // State filter
    if (stateFilter) {
      filtered = filtered.filter((p) =>
        p.state.toLowerCase().includes(stateFilter.toLowerCase())
      );
    }

    // Price filters
    if (minPrice) {
      filtered = filtered.filter((p) => p.monthlyRent >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.monthlyRent <= parseInt(maxPrice));
    }

    // Bedrooms filter
    if (bedroomsFilter) {
      filtered = filtered.filter((p) => p.bedrooms >= parseInt(bedroomsFilter));
    }

    // Property type filter
    if (propertyTypeFilter) {
      filtered = filtered.filter((p) => p.propertyType === propertyTypeFilter);
    }

    // Furnished filter
    if (furnishedFilter !== null) {
      filtered = filtered.filter((p) => p.furnished === furnishedFilter);
    }

    // Pets allowed filter
    if (petsAllowedFilter !== null) {
      filtered = filtered.filter((p) => p.petsAllowed === petsAllowedFilter);
    }

    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setCityFilter('');
    setStateFilter('');
    setMinPrice('');
    setMaxPrice('');
    setBedroomsFilter('');
    setPropertyTypeFilter('');
    setFurnishedFilter(null);
    setPetsAllowedFilter(null);
  };

  const handleSaveToggle = (propertyId: string, isSaved: boolean) => {
    setSavedPropertyIds((prev) => {
      const newSet = new Set(prev);
      if (isSaved) {
        newSet.add(propertyId);
      } else {
        newSet.delete(propertyId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/subletly-logo.png"
                alt="Subletly"
                width={400}
                height={100}
                className="h-20 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-4">
              {session?.user ? (
                <Link
                  href={
                    session.user.accountType === 'LANDLORD'
                      ? '/dashboard/landlord'
                      : '/dashboard/renter'
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Properties</h1>
          <p className="text-gray-600">
            Find your perfect sublet from {properties.length} verified listings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    placeholder="e.g., New York"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    placeholder="e.g., NY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Bedrooms
                  </label>
                  <select
                    value={bedroomsFilter}
                    onChange={(e) => setBedroomsFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyTypeFilter}
                    onChange={(e) => setPropertyTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Types</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="HOUSE">House</option>
                    <option value="CONDO">Condo</option>
                    <option value="STUDIO">Studio</option>
                    <option value="ROOM">Room</option>
                  </select>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={furnishedFilter === true}
                        onChange={(e) =>
                          setFurnishedFilter(e.target.checked ? true : null)
                        }
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Furnished</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={petsAllowedFilter === true}
                        onChange={(e) =>
                          setPetsAllowedFilter(e.target.checked ? true : null)
                        }
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Pets Allowed</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredProperties.length}</span>{' '}
                {filteredProperties.length === 1 ? 'property' : 'properties'}
              </p>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isSaved={savedPropertyIds.has(property.id)}
                    onSaveToggle={handleSaveToggle}
                    showSaveButton={session?.user?.accountType === 'RENTER'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
