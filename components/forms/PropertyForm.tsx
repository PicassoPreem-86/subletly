// PropertyForm type definitions
// This file exports the shared type used by property form step components

export interface PropertyFormData {
  // Basic Info
  title: string;
  description: string;
  propertyType: 'APARTMENT' | 'HOUSE' | 'CONDO' | 'STUDIO' | 'ROOM';

  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood?: string;

  // Details
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  furnished: boolean;
  petsAllowed: boolean;
  parking: boolean;
  smoking: boolean;
  amenities: string[];

  // Pricing & Availability
  monthlyRent: number;
  deposit?: number;
  utilities: boolean;
  availableFrom: string | Date;
  availableTo: string | Date;
  minStay?: number;

  // Images
  images: string[];

  // Status
  status?: 'DRAFT' | 'ACTIVE' | 'INACTIVE';
}

export const defaultPropertyFormData: PropertyFormData = {
  title: '',
  description: '',
  propertyType: 'APARTMENT',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  neighborhood: '',
  bedrooms: 1,
  bathrooms: 1,
  squareFeet: undefined,
  furnished: false,
  petsAllowed: false,
  parking: false,
  smoking: false,
  amenities: [],
  monthlyRent: 0,
  deposit: undefined,
  utilities: false,
  availableFrom: '',
  availableTo: '',
  minStay: undefined,
  images: [],
  status: 'DRAFT',
};
