'use client';

import { Landlord } from '@/types/property';
import { User, CheckCircle } from 'lucide-react';
import { getRelativeTime } from '@/lib/utils/propertyHelpers';

interface LandlordCardProps {
  landlord: Landlord;
  propertyCreatedAt: string;
}

export default function LandlordCard({ landlord, propertyCreatedAt }: LandlordCardProps) {
  const initials = `${landlord.firstName[0]}${landlord.lastName[0]}`;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Landlord</h3>

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">{initials}</span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900">
              {landlord.firstName} {landlord.lastName}
            </p>
            {landlord.verified && (
              <CheckCircle className="w-5 h-5 text-blue-500" aria-label="Verified landlord" />
            )}
          </div>

          <p className="text-sm text-gray-600 mb-3">Property Owner</p>

          <div className="space-y-2 text-sm">
            {landlord.memberSince && (
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Member since {new Date(landlord.memberSince).getFullYear()}</span>
              </div>
            )}

            {landlord.responseTime && (
              <div className="text-gray-600">
                <span className="font-medium">Response time:</span> {landlord.responseTime}
              </div>
            )}

            {landlord.totalProperties && landlord.totalProperties > 1 && (
              <div className="text-gray-600">
                <span className="font-medium">{landlord.totalProperties}</span> active listings
              </div>
            )}

            <div className="text-gray-500 text-xs pt-2 border-t border-gray-100">
              Listed {getRelativeTime(propertyCreatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
