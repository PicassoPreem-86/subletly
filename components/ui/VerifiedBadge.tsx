'use client';

import { CheckCircle } from 'lucide-react';
import InfoTooltip from './InfoTooltip';
import { TRUST_DEFINITIONS } from '@/lib/constants/trustDefinitions';

interface VerifiedBadgeProps {
  type?: 'host' | 'guest';
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function VerifiedBadge({
  type = 'host',
  showTooltip = true,
  size = 'md',
  className = '',
}: VerifiedBadgeProps) {
  const definition = type === 'host'
    ? TRUST_DEFINITIONS.verifiedHost
    : TRUST_DEFINITIONS.verifiedGuest;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <CheckCircle
        className={`${sizeClasses[size]} text-blue-500`}
        aria-label={definition.title}
      />
      {showTooltip && (
        <InfoTooltip
          title={definition.title}
          content={definition.fullDescription}
          size="sm"
        />
      )}
    </span>
  );
}
