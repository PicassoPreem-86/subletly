'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PropertyFormData } from '../PropertyForm';

interface LocationStepProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
}

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'Washington D.C.' },
];

export default function LocationStep({ register, errors }: LocationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Location</h2>
        <p className="text-gray-600">Where is your property located?</p>
      </div>

      {/* Street Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register('address')}
          id="address"
          type="text"
          placeholder="123 Main Street, Apt 4B"
          className={`
            w-full px-4 py-3 border rounded-lg outline-none transition-colors text-gray-900 placeholder:text-gray-400
            ${errors.address
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
            }
          `}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      {/* City, State, ZIP Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            {...register('city')}
            id="city"
            type="text"
            placeholder="New York"
            className={`
              w-full px-4 py-3 border rounded-lg outline-none transition-colors text-gray-900 placeholder:text-gray-400
              ${errors.city
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              }
            `}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <select
            {...register('state')}
            id="state"
            className={`
              w-full px-4 py-3 border rounded-lg outline-none transition-colors bg-white text-gray-900
              ${errors.state
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              }
            `}
          >
            <option value="">Select state</option>
            {US_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code <span className="text-red-500">*</span>
          </label>
          <input
            {...register('zipCode')}
            id="zipCode"
            type="text"
            placeholder="10001"
            maxLength={10}
            className={`
              w-full px-4 py-3 border rounded-lg outline-none transition-colors text-gray-900 placeholder:text-gray-400
              ${errors.zipCode
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              }
            `}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-2">
          Neighborhood <span className="text-gray-400">(optional)</span>
        </label>
        <input
          {...register('neighborhood')}
          id="neighborhood"
          type="text"
          placeholder="e.g., Upper West Side, Downtown, Midtown"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-900 placeholder:text-gray-400"
        />
        <p className="mt-1 text-xs text-gray-500">Help renters find you by including your neighborhood name</p>
      </div>

      {/* Location Tips */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-purple-900">Privacy Note</p>
            <p className="text-sm text-purple-700 mt-1">
              Your exact address will only be shared with guests after they confirm a booking.
              Public listings show only the city and neighborhood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
