// Centralized type definitions for property-related data

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string | null;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number | null;
  furnished: boolean;
  monthlyRent: number;
  deposit: number | null;
  utilities: boolean;
  availableFrom: string;
  availableTo: string;
  minStay: number | null;
  amenities: string[];
  images: string[];
  petsAllowed: boolean;
  smoking: boolean;
  parking: boolean;
  views: number;
  landlord: Landlord;
  createdAt: string;
  updatedAt?: string;
}

export interface Landlord {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  verified?: boolean;
  memberSince?: string;
  responseTime?: string;
  totalProperties?: number;
}

export interface SavedProperty {
  property: {
    id: string;
  };
}

export interface PropertyHighlight {
  icon: string;
  label: string;
  value: string | boolean;
}

export interface NearbyPlace {
  name: string;
  type: 'transit' | 'restaurant' | 'school' | 'grocery' | 'gym' | 'park';
  distance: number; // in miles
  walkTime?: number; // in minutes
}

export interface NeighborhoodScores {
  walkability?: number; // 0-100
  transit?: number; // 0-100
  bikeability?: number; // 0-100
}

export interface TourRequest {
  propertyId: string;
  date: string;
  time: string;
  tourType: 'in-person' | 'virtual';
  message?: string;
}

export interface InquiryData {
  propertyId: string;
  message: string;
  phone?: string;
  moveInDate?: string;
}

export interface ShareData {
  url: string;
  title: string;
  text?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export interface GeocodeResult {
  lat: number;
  lng: number;
  displayName?: string;
}

export type PropertyStatus = 'AVAILABLE' | 'RENTED' | 'PENDING' | 'INACTIVE';
export type PropertyType = 'APARTMENT' | 'HOUSE' | 'CONDO' | 'ROOM' | 'STUDIO';
export type AmenityCategory = 'basic' | 'appliances' | 'features' | 'outdoor' | 'building';

export interface CategorizedAmenities {
  basic: string[];
  appliances: string[];
  features: string[];
  outdoor: string[];
  building: string[];
}
