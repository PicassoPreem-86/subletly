import { Property, PropertyHighlight, CategorizedAmenities, FAQItem } from '@/types/property';
import { formatDistanceToNow } from 'date-fns';

/**
 * Format price with currency symbol and locale
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Calculate price range for similar properties (±20%)
 */
export function calculatePriceRange(basePrice: number): { min: number; max: number } {
  return {
    min: Math.floor(basePrice * 0.8),
    max: Math.ceil(basePrice * 1.2),
  };
}

/**
 * Auto-detect and extract property highlights
 */
export function extractPropertyHighlights(property: Property): PropertyHighlight[] {
  const highlights: PropertyHighlight[] = [];

  if (property.petsAllowed) {
    highlights.push({ icon: '🐾', label: 'Pet-friendly', value: true });
  }

  if (property.utilities) {
    highlights.push({ icon: '💡', label: 'Utilities Included', value: true });
  }

  if (property.furnished) {
    highlights.push({ icon: '🛋️', label: 'Furnished', value: true });
  }

  if (property.parking) {
    highlights.push({ icon: '🅿️', label: 'Parking Available', value: true });
  }

  if (!property.smoking) {
    highlights.push({ icon: '🚭', label: 'Non-smoking', value: true });
  }

  if (property.squareFeet && property.squareFeet > 1000) {
    highlights.push({ icon: '📐', label: 'Spacious', value: `${property.squareFeet} sq ft` });
  }

  // Return max 6 highlights
  return highlights.slice(0, 6);
}

/**
 * Categorize amenities by type
 */
export function categorizeAmenities(amenities: string[]): CategorizedAmenities {
  const categorized: CategorizedAmenities = {
    basic: [],
    appliances: [],
    features: [],
    outdoor: [],
    building: [],
  };

  const basicAmenities = ['Wi-Fi', 'Heating', 'AC', 'Water', 'Electricity'];
  const applianceAmenities = ['Washer', 'Dryer', 'Dishwasher', 'Refrigerator', 'Microwave', 'Oven', 'Stove'];
  const featureAmenities = ['Hardwood Floors', 'Carpet', 'Tile', 'Walk-in Closet', 'Storage'];
  const outdoorAmenities = ['Balcony', 'Patio', 'Yard', 'Garden'];
  const buildingAmenities = ['Gym', 'Pool', 'Laundry', 'Elevator', 'Doorman', 'Security'];

  amenities.forEach((amenity) => {
    if (basicAmenities.some((b) => amenity.toLowerCase().includes(b.toLowerCase()))) {
      categorized.basic.push(amenity);
    } else if (applianceAmenities.some((a) => amenity.toLowerCase().includes(a.toLowerCase()))) {
      categorized.appliances.push(amenity);
    } else if (featureAmenities.some((f) => amenity.toLowerCase().includes(f.toLowerCase()))) {
      categorized.features.push(amenity);
    } else if (outdoorAmenities.some((o) => amenity.toLowerCase().includes(o.toLowerCase()))) {
      categorized.outdoor.push(amenity);
    } else if (buildingAmenities.some((b) => amenity.toLowerCase().includes(b.toLowerCase()))) {
      categorized.building.push(amenity);
    } else {
      categorized.features.push(amenity); // Default category
    }
  });

  return categorized;
}

/**
 * Generate FAQ items based on property data
 */
export function generateFAQs(property: Property): FAQItem[] {
  const faqs: FAQItem[] = [];

  faqs.push({
    question: 'What is the monthly rent?',
    answer: `The monthly rent is ${formatPrice(property.monthlyRent)}${property.utilities ? ' with utilities included' : ''}.`,
  });

  if (property.deposit) {
    faqs.push({
      question: 'What is the security deposit?',
      answer: `The security deposit is ${formatPrice(property.deposit)}.`,
    });
  }

  faqs.push({
    question: 'Are pets allowed?',
    answer: property.petsAllowed
      ? 'Yes, pets are allowed at this property.'
      : 'No, pets are not allowed at this property.',
  });

  if (property.parking) {
    faqs.push({
      question: 'Is parking available?',
      answer: 'Yes, parking is available at this property.',
    });
  }

  if (property.minStay) {
    faqs.push({
      question: 'What is the minimum lease term?',
      answer: `The minimum lease term is ${property.minStay} ${property.minStay === 1 ? 'month' : 'months'}.`,
    });
  }

  faqs.push({
    question: 'When is the property available?',
    answer: `The property is available from ${formatDate(property.availableFrom)} to ${formatDate(property.availableTo)}.`,
  });

  return faqs;
}

/**
 * Calculate days on market
 */
export function calculateDaysOnMarket(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

/**
 * Validate if property is currently available
 */
export function isPropertyAvailable(property: Property): boolean {
  const now = new Date();
  const availableFrom = new Date(property.availableFrom);
  const availableTo = new Date(property.availableTo);

  return now >= availableFrom && now <= availableTo && property.status === 'AVAILABLE';
}

/**
 * Get property type display name
 */
export function getPropertyTypeLabel(propertyType: string): string {
  const typeMap: Record<string, string> = {
    APARTMENT: 'Apartment',
    HOUSE: 'House',
    CONDO: 'Condo',
    ROOM: 'Room',
    STUDIO: 'Studio',
  };

  return typeMap[propertyType] || propertyType;
}

/**
 * Format square feet with commas
 */
export function formatSquareFeet(sqft: number | null): string {
  if (!sqft) return 'N/A';
  return new Intl.NumberFormat('en-US').format(sqft);
}

/**
 * Calculate price per square foot
 */
export function calculatePricePerSqFt(monthlyRent: number, squareFeet: number | null): string {
  if (!squareFeet) return 'N/A';
  const pricePerSqFt = monthlyRent / squareFeet;
  return `$${pricePerSqFt.toFixed(2)}/sq ft`;
}

/**
 * Truncate description with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
