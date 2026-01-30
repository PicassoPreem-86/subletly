'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { PropertyFormData } from '../PropertyForm';

interface PricingStepProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
}

export default function PricingStep({ register, errors, watch }: PricingStepProps) {
  const monthlyRent = watch('monthlyRent');
  const deposit = watch('deposit');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Pricing & Availability</h2>
        <p className="text-gray-600">Set your rental price and when guests can stay</p>
      </div>

      {/* Monthly Rent */}
      <div>
        <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Rent <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
          <input
            {...register('monthlyRent', { valueAsNumber: true })}
            id="monthlyRent"
            type="number"
            min="1"
            placeholder="2000"
            className={`
              w-full sm:w-64 pl-8 pr-4 py-3 border rounded-lg outline-none transition-colors text-gray-900 placeholder:text-gray-400
              ${errors.monthlyRent
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              }
            `}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">/month</span>
        </div>
        {errors.monthlyRent && (
          <p className="mt-1 text-sm text-red-600">{errors.monthlyRent.message}</p>
        )}
      </div>

      {/* Security Deposit */}
      <div>
        <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-2">
          Security Deposit <span className="text-gray-400">(optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
          <input
            {...register('deposit', { valueAsNumber: true })}
            id="deposit"
            type="number"
            min="0"
            placeholder="2000"
            className="w-full sm:w-64 pl-8 pr-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-900 placeholder:text-gray-400"
          />
        </div>
        {errors.deposit && (
          <p className="mt-1 text-sm text-red-600">{errors.deposit.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Common amounts: 1 month rent (${monthlyRent?.toLocaleString() || '—'}) or 1.5x rent (${monthlyRent ? Math.round(monthlyRent * 1.5).toLocaleString() : '—'})
        </p>
      </div>

      {/* Utilities Included */}
      <div>
        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all">
          <input {...register('utilities')} type="checkbox" className="sr-only peer" />
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">💡</span>
            <div>
              <span className="font-medium text-gray-900">Utilities Included</span>
              <p className="text-sm text-gray-500">Electric, gas, water, etc. included in rent</p>
            </div>
          </div>
          <div className="w-10 h-6 rounded-full bg-gray-200 peer-checked:bg-purple-600 relative transition-colors">
            <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
          </div>
        </label>
      </div>

      {/* Availability Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-2">
            Available From <span className="text-red-500">*</span>
          </label>
          <input
            {...register('availableFrom')}
            id="availableFrom"
            type="date"
            className={`
              w-full px-4 py-3 border rounded-lg outline-none transition-colors text-gray-900
              ${errors.availableFrom
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              }
            `}
          />
          {errors.availableFrom && (
            <p className="mt-1 text-sm text-red-600">{errors.availableFrom.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="availableTo" className="block text-sm font-medium text-gray-700 mb-2">
            Available Until <span className="text-red-500">*</span>
          </label>
          <input
            {...register('availableTo')}
            id="availableTo"
            type="date"
            className={`
              w-full px-4 py-3 border rounded-lg outline-none transition-colors text-gray-900
              ${errors.availableTo
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              }
            `}
          />
          {errors.availableTo && (
            <p className="mt-1 text-sm text-red-600">{errors.availableTo.message}</p>
          )}
        </div>
      </div>

      {/* Minimum Stay */}
      <div>
        <label htmlFor="minStay" className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Stay <span className="text-gray-400">(optional)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            {...register('minStay', { valueAsNumber: true })}
            id="minStay"
            type="number"
            min="1"
            max="24"
            placeholder="1"
            className="w-24 px-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-900 placeholder:text-gray-400"
          />
          <span className="text-gray-600">months</span>
        </div>
        {errors.minStay && (
          <p className="mt-1 text-sm text-red-600">{errors.minStay.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">Leave blank for no minimum stay requirement</p>
      </div>

      {/* Pricing Summary */}
      {(monthlyRent || deposit) && (
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-purple-900 mb-4">Pricing Summary</h3>
          <div className="space-y-3">
            {monthlyRent && (
              <div className="flex justify-between">
                <span className="text-purple-700">Monthly Rent</span>
                <span className="font-semibold text-purple-900">${monthlyRent.toLocaleString()}</span>
              </div>
            )}
            {deposit && (
              <div className="flex justify-between">
                <span className="text-purple-700">Security Deposit</span>
                <span className="font-semibold text-purple-900">${deposit.toLocaleString()}</span>
              </div>
            )}
            {monthlyRent && deposit && (
              <>
                <hr className="border-purple-200" />
                <div className="flex justify-between">
                  <span className="text-purple-700">Move-in Total</span>
                  <span className="font-bold text-purple-900">${(monthlyRent + deposit).toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
