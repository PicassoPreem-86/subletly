import { Property, ShareData } from '@/types/property';

/**
 * Check if Web Share API is supported
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Generate share data for a property
 */
export function generateShareData(property: Property, url: string): ShareData {
  return {
    url,
    title: property.title,
    text: `Check out this ${property.propertyType.toLowerCase()} in ${property.city}, ${property.state} - $${property.monthlyRent.toLocaleString()}/month`,
  };
}

/**
 * Share using native Web Share API (mobile)
 */
export async function shareNative(shareData: ShareData): Promise<boolean> {
  if (!isWebShareSupported()) {
    return false;
  }

  try {
    await navigator.share(shareData);
    return true;
  } catch (error) {
    // User cancelled or error occurred
    console.error('Error sharing:', error);
    return false;
  }
}

/**
 * Copy URL to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

/**
 * Generate email share URL
 */
export function generateEmailShareUrl(property: Property, url: string): string {
  const subject = encodeURIComponent(`Check out this property: ${property.title}`);
  const body = encodeURIComponent(
    `I thought you might be interested in this property:\n\n${property.title}\n${property.address}, ${property.city}, ${property.state}\n\n$${property.monthlyRent.toLocaleString()}/month\n${property.bedrooms} bed, ${property.bathrooms} bath\n\nView details: ${url}`
  );

  return `mailto:?subject=${subject}&body=${body}`;
}

/**
 * Generate WhatsApp share URL
 */
export function generateWhatsAppShareUrl(property: Property, url: string): string {
  const text = encodeURIComponent(
    `Check out this property: ${property.title} - $${property.monthlyRent.toLocaleString()}/month in ${property.city}, ${property.state}\n${url}`
  );

  return `https://wa.me/?text=${text}`;
}

/**
 * Generate SMS share URL
 */
export function generateSMSShareUrl(property: Property, url: string): string {
  const text = encodeURIComponent(
    `Check out this property: ${property.title} - $${property.monthlyRent.toLocaleString()}/month\n${url}`
  );

  // For iOS
  if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
    return `sms:&body=${text}`;
  }

  // For Android
  return `sms:?body=${text}`;
}

/**
 * Track share event (analytics)
 */
export function trackShare(method: 'native' | 'copy' | 'email' | 'facebook' | 'twitter' | 'whatsapp' | 'sms', propertyId: string): void {
  // Implement analytics tracking here
  console.log(`Property ${propertyId} shared via ${method}`);

  // Example: Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) {
      gtag('event', 'share', {
        method,
        content_type: 'property',
        item_id: propertyId,
      });
    }
  }
}
