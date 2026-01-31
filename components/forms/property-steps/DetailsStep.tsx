'use client';

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { PropertyFormData } from '../PropertyForm';

interface DetailsStepProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
  setValue: UseFormSetValue<PropertyFormData>;
}

const AMENITIES = [
  { value: 'Air Conditioning', icon: '❄️' },
  { value: 'Heating', icon: '🔥' },
  { value: 'Washer', icon: '🧺' },
  { value: 'Dryer', icon: '👕' },
  { value: 'Dishwasher', icon: '🍽️' },
  { value: 'WiFi', icon: '📶' },
  { value: 'TV', icon: '📺' },
  { value: 'Kitchen', icon: '🍳' },
  { value: 'Microwave', icon: '📦' },
  { value: 'Refrigerator', icon: '🧊' },
  { value: 'Gym Access', icon: '🏋️' },
  { value: 'Pool', icon: '🏊' },
  { value: 'Balcony', icon: '🌇' },
  { value: 'Patio', icon: '🪴' },
  { value: 'Backyard', icon: '🌳' },
  { value: 'Elevator', icon: '🛗' },
  { value: 'Doorman', icon: '🚪' },
  { value: 'Security System', icon: '🔒' },
  { value: 'Storage', icon: '📦' },
  { value: 'Workspace', icon: '💻' },
];

export default function DetailsStep({ register, errors, watch, setValue }: DetailsStepProps) {
  const bedrooms = watch('bedrooms');
  const bathrooms = watch('bathrooms');
  const amenities = watch('amenities') || [];

  const toggleAmenity = (amenity: string) => {
    const current = amenities || [];
    if (current.includes(amenity)) {
      setValue('amenities', current.filter((a: string) => a !== amenity), { shouldValidate: true });
    } else {
      setValue('amenities', [...current, amenity], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Property Details</h2>
        <p className="text-gray-600">Tell us more about your space</p>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bedrooms <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setValue('bedrooms', Math.max(0, (bedrooms || 0) - 1), { shouldValidate: true })}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-2xl font-bold text-gray-900 w-12 text-center">{bedrooms || 0}</span>
            <button
              type="button"
              onClick={() => setValue('bedrooms', Math.min(10, (bedrooms || 0) + 1), { shouldValidate: true })}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <input type="hidden" {...register('bedrooms', { valueAsNumber: true })} />
          {errors.bedrooms && (
            <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
          )}
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bathrooms <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setValue('bathrooms', Math.max(0.5, (bathrooms || 0.5) - 0.5), { shouldValidate: true })}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-2xl font-bold text-gray-900 w-12 text-center">{bathrooms || 0}</span>
            <button
              type="button"
              onClick={() => setValue('bathrooms', Math.min(10, (bathrooms || 0) + 0.5), { shouldValidate: true })}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <input type="hidden" {...register('bathrooms', { valueAsNumber: true })} />
          {errors.bathrooms && (
            <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Use 0.5 for half baths</p>
        </div>
      </div>

      {/* Square Feet */}
      <div>
        <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-2">
          Square Feet <span className="text-gray-400">(optional)</span>
        </label>
        <input
          {...register('squareFeet', { valueAsNumber: true })}
          id="squareFeet"
          type="number"
          min="0"
          placeholder="e.g., 850"
          className="w-full sm:w-48 px-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-900 placeholder:text-gray-400"
        />
        {errors.squareFeet && (
          <p className="mt-1 text-sm text-red-600">{errors.squareFeet.message}</p>
        )}
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Furnished */}
          <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all">
            <input {...register('furnished')} type="checkbox" className="sr-only peer" />
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">🛋️</span>
              <span className="font-medium text-gray-900">Furnished</span>
            </div>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-purple-600 peer-checked:bg-purple-50 pointer-events-none" />
            <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-purple-600 peer-checked:bg-purple-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </label>

          {/* Pets Allowed */}
          <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all">
            <input {...register('petsAllowed')} type="checkbox" className="sr-only peer" />
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">🐾</span>
              <span className="font-medium text-gray-900">Pets Allowed</span>
            </div>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-purple-600 peer-checked:bg-purple-50 pointer-events-none" />
            <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-purple-600 peer-checked:bg-purple-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </label>

          {/* Parking */}
          <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all">
            <input {...register('parking')} type="checkbox" className="sr-only peer" />
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">🚗</span>
              <span className="font-medium text-gray-900">Parking</span>
            </div>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-purple-600 peer-checked:bg-purple-50 pointer-events-none" />
            <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-purple-600 peer-checked:bg-purple-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </label>

          {/* Smoking */}
          <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all">
            <input {...register('smoking')} type="checkbox" className="sr-only peer" />
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">🚬</span>
              <span className="font-medium text-gray-900">Smoking OK</span>
            </div>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-purple-600 peer-checked:bg-purple-50 pointer-events-none" />
            <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-purple-600 peer-checked:bg-purple-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </label>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Amenities <span className="text-gray-400">(select all that apply)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {AMENITIES.map((amenity) => (
            <button
              key={amenity.value}
              type="button"
              onClick={() => toggleAmenity(amenity.value)}
              className={`
                flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition-all
                ${amenities.includes(amenity.value)
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 text-gray-700'
                }
              `}
            >
              <span>{amenity.icon}</span>
              <span>{amenity.value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
