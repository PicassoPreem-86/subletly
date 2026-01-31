import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Message {
  id: string;
  content: string;
  readAt: string | null;
  createdAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
}

interface InquiryData {
  id: string;
  message: string;
  phone: string | null;
  moveInDate: string | null;
  status: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    state: string;
    monthlyRent: number;
    images: string;
    landlordId: string;
    landlord: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      image: string | null;
    };
  };
  renter: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string | null;
  };
  messages: Message[];
}

interface ConversationResponse {
  inquiry: InquiryData;
}

async function fetchConversation(inquiryId: string): Promise<ConversationResponse> {
  const response = await fetch(`/api/inquiries/${inquiryId}`);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to load conversation');
  }
  return response.json();
}

async function markAsRead(inquiryId: string): Promise<void> {
  await fetch(`/api/inquiries/${inquiryId}/read`, {
    method: 'PATCH',
  });
}

async function sendMessage(inquiryId: string, content: string): Promise<Message> {
  const response = await fetch(`/api/inquiries/${inquiryId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to send message');
  }
  const data = await response.json();
  return data.message;
}

export function useConversation(inquiryId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['conversation', inquiryId],
    queryFn: () => fetchConversation(inquiryId),
    enabled: enabled && !!inquiryId,
    staleTime: 1000 * 5, // 5 seconds
    refetchInterval: 1000 * 10, // Poll every 10 seconds for active conversation
  });
}

export function useMarkAsRead(inquiryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAsRead(inquiryId),
    onSuccess: () => {
      // Invalidate queries to refresh unread counts
      queryClient.invalidateQueries({ queryKey: ['renterInquiries'] });
      queryClient.invalidateQueries({ queryKey: ['landlordInquiries'] });
    },
  });
}

export function useSendMessage(inquiryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => sendMessage(inquiryId, content),
    onSuccess: () => {
      // Refetch the conversation to show the new message
      queryClient.invalidateQueries({ queryKey: ['conversation', inquiryId] });
      // Also refresh inbox queries
      queryClient.invalidateQueries({ queryKey: ['renterInquiries'] });
      queryClient.invalidateQueries({ queryKey: ['landlordInquiries'] });
    },
  });
}
