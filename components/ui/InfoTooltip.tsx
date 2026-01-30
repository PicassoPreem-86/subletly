'use client';

import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
  title?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function InfoTooltip({
  content,
  title,
  size = 'sm',
  className = ''
}: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Calculate position to avoid going off-screen
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      // Show below if not enough space above
      if (spaceAbove < 150 && spaceBelow > spaceAbove) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 rounded-full"
        aria-label="More information"
      >
        <Info className={iconSize} />
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`
            absolute z-50 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg
            ${position === 'top'
              ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
              : 'top-full mt-2 left-1/2 -translate-x-1/2'
            }
          `}
        >
          {title && (
            <p className="font-semibold mb-1">{title}</p>
          )}
          <p className="text-gray-200 leading-relaxed">{content}</p>

          {/* Arrow */}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-0 h-0
              border-l-[6px] border-l-transparent
              border-r-[6px] border-r-transparent
              ${position === 'top'
                ? 'top-full border-t-[6px] border-t-gray-900'
                : 'bottom-full border-b-[6px] border-b-gray-900'
              }
            `}
          />
        </div>
      )}
    </div>
  );
}
