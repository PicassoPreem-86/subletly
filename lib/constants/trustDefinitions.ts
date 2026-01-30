// Centralized trust and safety copy used throughout the app
// These definitions ensure consistent messaging about trust features

export const TRUST_DEFINITIONS = {
  escrow: {
    title: "Escrow Protection",
    shortDescription: "Your payment is held securely until 24-48 hours after move-in.",
    fullDescription: "Your payment is held securely until 24-48 hours after move-in. This protects you from scams—if anything is wrong with the property, you can dispute before funds release to the host.",
  },
  verifiedHost: {
    title: "Verified Host",
    shortDescription: "This host has verified their identity.",
    fullDescription: "This host has completed identity verification (government ID) and phone verification. This confirms their identity but does not guarantee the accuracy of listing details.",
  },
  verifiedGuest: {
    title: "Verified Guest",
    shortDescription: "This guest has verified their identity.",
    fullDescription: "This guest has completed identity verification (government ID) and phone verification. This confirms their identity for hosts reviewing applications.",
  },
  listingStatus: {
    DRAFT: {
      label: "Draft",
      description: "Not yet submitted. Only visible to you.",
      color: "gray",
    },
    PENDING_REVIEW: {
      label: "Pending Review",
      description: "Our team is reviewing your listing (usually within 24h).",
      color: "yellow",
    },
    ACTIVE: {
      label: "Active",
      description: "Approved and visible to guests.",
      color: "green",
    },
    RENTED: {
      label: "Rented",
      description: "Marked as rented, hidden from search.",
      color: "blue",
    },
    INACTIVE: {
      label: "Inactive",
      description: "Paused by you or removed.",
      color: "red",
    },
  },
} as const;

// User-facing terminology
// Database uses LANDLORD/RENTER, but UI shows Host/Guest
export const USER_TERMS = {
  landlord: "Host",
  renter: "Guest",
  landlordDescription: "Someone subletting their place",
  renterDescription: "Someone looking for a sublet",
} as const;

// Positioning copy - why Subletly vs alternatives
export const POSITIONING = {
  tagline: "A safer alternative to Facebook housing groups",
  comparisons: [
    {
      feature: "Verified identities",
      subletly: true,
      alternative: "Anonymous strangers",
    },
    {
      feature: "Escrow protection",
      subletly: true,
      alternative: "Direct Venmo/Zelle payments",
    },
    {
      feature: "Reviewed listings",
      subletly: true,
      alternative: "Unmoderated posts",
    },
  ],
} as const;

export type PropertyStatusKey = keyof typeof TRUST_DEFINITIONS.listingStatus;
