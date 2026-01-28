'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { generateFAQs } from '@/lib/utils/propertyHelpers';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  property: Property;
}

export default function FAQAccordion({ property }: FAQAccordionProps) {
  const faqs = generateFAQs(property);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === idx ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {openIndex === idx && (
              <div className="px-4 pb-4 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
