'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PropertyFormData } from '../PropertyForm';

interface BasicInfoStepProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
}

const PROPERTY_TYPES = [
  { value: 'APARTMENT', label: 'Apartment', description: 'A unit in a multi-family building' },
  { value: 'HOUSE', label: 'House', description: 'A standalone single-family home' },
  { value: 'CONDO', label: 'Condo', description: 'An owned unit in a larger building' },
  { value: 'STUDIO', label: 'Studio', description: 'A single room with combined living areas' },
  { value: 'ROOM', label: 'Room', description: 'A private room in a shared space' },
] as const;

export default function BasicInfoStep({ register, errors }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Basic Information</h2>
        <p className="text-gray-600">Tell us about your property</p>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Listing Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title')}
          id="title"
          type="text"
          placeholder="e.g., Sunny 2BR in Downtown with Amazing Views"
          className={`
            w-full px-4 py-3 border rounded-lg outline-none transition-colors text-gray-900 placeholder:text-gray-400
            ${errors.title
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
            }
          `}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">10-100 characters. Make it descriptive and appealing!</p>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROPERTY_TYPES.map((type) => (
            <label
              key={type.value}
              className={`
                relative flex items-start p-4 border rounded-lg cursor-pointer transition-all
                hover:border-purple-300 hover:bg-purple-50
                ${errors.propertyType ? 'border-red-300' : 'border-gray-200'}
              `}
            >
              <input
                {...register('propertyType')}
                type="radio"
                value={type.value}
                className="sr-only peer"
              />
              <div className="flex-1">
                <span className="block font-medium text-gray-900">{type.label}</span>
                <span className="block text-sm text-gray-500">{type.description}</span>
              </div>
              <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-purple-600 pointer-events-none" />
              <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-purple-600 peer-checked:bg-purple-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </label>
          ))}
        </div>
        {errors.propertyType && (
          <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={6}
          placeholder="Describe your property in detail. Include what makes it special, the neighborhood, nearby amenities, etc."
          className={`
            w-full px-4 py-3 border rounded-lg outline-none transition-colors resize-none text-gray-900 placeholder:text-gray-400
            ${errors.description
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
            }
          `}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">50-2000 characters. The more detail, the better!</p>
      </div>
    </div>
  );
}
