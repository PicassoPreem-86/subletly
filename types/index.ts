// Type Definitions for Subletly App
import type { User, Property, AccountType, PropertyStatus, PropertyType } from '@prisma/client';

// Re-export Prisma types
export type { User, Property, AccountType, PropertyStatus, PropertyType };

// Omit sensitive fields from User
export type SafeUser = Omit<User, 'password'>;

// Property with landlord info
export type PropertyWithLandlord = Property & {
  landlord: SafeUser;
};

// Property form data (for creating/updating)
export interface PropertyFormData {
  title: string;
  description: string;
  propertyType: PropertyType;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood?: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  furnished: boolean;
  monthlyRent: number;
  deposit?: number;
  utilities: boolean;
  availableFrom: Date | string;
  availableTo: Date | string;
  minStay?: number;
  amenities: string[];
  images: string[];
  petsAllowed: boolean;
  smoking: boolean;
  parking: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter/Search types
export interface PropertyFilters {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType;
  furnished?: boolean;
  petsAllowed?: boolean;
  parking?: boolean;
  availableFrom?: string;
  availableTo?: string;
}
