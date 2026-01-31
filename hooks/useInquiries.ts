import { useQuery } from '@tanstack/react-query';

interface Inquiry {
  id: string;
  message: string;
  status: string;
  createdAt: string;
  lastMessageAt: string | null;
  unreadCount: number;
  property: {
    id: string;
    title: string;
    city: string;
    state: string;
    monthlyRent: number;
    images: string | string[];
  };
  renter?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string | null;
  };
  lastMessage: {
    content: string;
    createdAt: string;
    senderId: string;
  } | null;
  _count: {
    messages: number;
  };
}

interface InquiriesResponse {
  inquiries: Inquiry[];
  totalUnread?: number;
}

async function fetchRenterInquiries(): Promise<InquiriesResponse> {
  const response = await fetch('/api/inquiries');
  if (!response.ok) {
    throw new Error('Failed to fetch inquiries');
  }
  return response.json();
}

async function fetchLandlordInquiries(): Promise<InquiriesResponse> {
  const response = await fetch('/api/landlord/inquiries');
  if (!response.ok) {
    throw new Error('Failed to fetch inquiries');
  }
  return response.json();
}

export function useRenterInquiries(enabled: boolean = true) {
  return useQuery({
    queryKey: ['renterInquiries'],
    queryFn: fetchRenterInquiries,
    enabled,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 30, // Poll every 30 seconds on inbox
  });
}

export function useLandlordInquiries(enabled: boolean = true) {
  return useQuery({
    queryKey: ['landlordInquiries'],
    queryFn: fetchLandlordInquiries,
    enabled,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 30, // Poll every 30 seconds on inbox
  });
}
