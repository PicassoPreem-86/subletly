'use client';

import { Property } from '@/types/property';
import { formatPrice, formatDate } from '@/lib/utils/propertyHelpers';
import { Calendar, DollarSign, Shield } from 'lucide-react';
import InfoTooltip from '@/components/ui/InfoTooltip';
import { TRUST_DEFINITIONS } from '@/lib/constants/trustDefinitions';

interface PriceCardProps {
  property: Property;
  onContactClick: () => void;
}

export default function PriceCard({ property, onContactClick }: PriceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1 mb-1">
          <span className="text-4xl font-bold text-purple-600">
            {formatPrice(property.monthlyRent)}
          </span>
          <span className="text-gray-600">/month</span>
        </div>

        {property.deposit && (
          <p className="text-sm text-gray-500 mt-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Deposit: {formatPrice(property.deposit)}
          </p>
        )}
      </div>

      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Available From
          </span>
          <span className="font-medium text-gray-900">
            {formatDate(property.availableFrom)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Available Until
          </span>
          <span className="font-medium text-gray-900">
            {formatDate(property.availableTo)}
          </span>
        </div>

        {property.minStay && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Minimum Stay</span>
            <span className="font-medium text-gray-900">
              {property.minStay} {property.minStay === 1 ? 'month' : 'months'}
            </span>
          </div>
        )}
      </div>

      {/* Escrow Protection Badge */}
      <div className="flex items-center justify-center gap-2 mb-4 py-2 px-3 bg-green-50 rounded-lg border border-green-200">
        <Shield className="w-5 h-5 text-green-600" />
        <span className="text-sm font-medium text-green-700">Protected by Escrow</span>
        <InfoTooltip
          title={TRUST_DEFINITIONS.escrow.title}
          content={TRUST_DEFINITIONS.escrow.fullDescription}
        />
      </div>

      <button
        onClick={onContactClick}
        className="w-full bg-purple-600 text-white py-3.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
      >
        Contact Host
      </button>

      <p className="text-xs text-center text-gray-500 mt-4">
        {property.views} {property.views === 1 ? 'view' : 'views'}
      </p>
    </div>
  );
}
