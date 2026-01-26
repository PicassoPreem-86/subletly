// Zod Validation Schemas
import { z } from 'zod';

// User Schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  accountType: z.enum(['RENTER', 'LANDLORD']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Property Schemas
export const propertySchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000),
  propertyType: z.enum(['APARTMENT', 'HOUSE', 'CONDO', 'STUDIO', 'ROOM']),
  status: z.enum(['DRAFT', 'ACTIVE', 'RENTED', 'INACTIVE']).optional(),

  // Location
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters (e.g., NY)'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  neighborhood: z.string().optional(),

  // Details
  bedrooms: z.number().int().min(0).max(10),
  bathrooms: z.number().min(0.5).max(10),
  squareFeet: z.number().int().positive().optional(),
  furnished: z.boolean(),

  // Pricing
  monthlyRent: z.number().int().positive('Monthly rent must be positive'),
  deposit: z.number().int().nonnegative().optional(),
  utilities: z.boolean(),

  // Availability
  availableFrom: z.coerce.date(),
  availableTo: z.coerce.date(),
  minStay: z.number().int().positive().optional(),

  // Amenities & Images
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),

  // Features
  petsAllowed: z.boolean().default(false),
  smoking: z.boolean().default(false),
  parking: z.boolean().default(false),
}).refine((data) => data.availableTo > data.availableFrom, {
  message: 'End date must be after start date',
  path: ['availableTo'],
});

export const propertyFilterSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  minPrice: z.number().int().nonnegative().optional(),
  maxPrice: z.number().int().positive().optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().nonnegative().optional(),
  propertyType: z.enum(['APARTMENT', 'HOUSE', 'CONDO', 'STUDIO', 'ROOM']).optional(),
  furnished: z.boolean().optional(),
  petsAllowed: z.boolean().optional(),
  parking: z.boolean().optional(),
  availableFrom: z.string().optional(),
  availableTo: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(50).default(20),
});

// User Profile Schema
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  image: z.string().url().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type PropertyFilterInput = z.infer<typeof propertyFilterSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
