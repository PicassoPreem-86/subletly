'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import ConversationThread from '@/components/messaging/ConversationThread';
import ReplyForm from '@/components/messaging/ReplyForm';

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
  messages: Array<{
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
  }>;
}

export default function RenterConversationPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const [inquiry, setInquiry] = useState<InquiryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const inquiryId = params.id as string;

  const fetchInquiry = useCallback(async () => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to load conversation');
      }
      const data = await response.json();
      setInquiry(data.inquiry);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversation');
    } finally {
      setIsLoading(false);
    }
  }, [inquiryId]);

  const markAsRead = useCallback(async () => {
    try {
      await fetch(`/api/inquiries/${inquiryId}/read`, {
        method: 'PATCH',
      });
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  }, [inquiryId]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      if (session.user.accountType !== 'RENTER') {
        router.push('/dashboard/landlord');
        return;
      }
      fetchInquiry().then(() => markAsRead());
    }
  }, [session, status, router, fetchInquiry, markAsRead]);

  const handleMessageSent = () => {
    fetchInquiry();
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error || 'Conversation not found'}</p>
          <Link
            href="/dashboard/renter/inquiries"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
          >
            Back to Inquiries
          </Link>
        </div>
      </div>
    );
  }

  // Parse images if it's a string
  const images = typeof inquiry.property.images === 'string'
    ? JSON.parse(inquiry.property.images)
    : inquiry.property.images;
  const propertyImage = images?.[0];

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    RESPONDED: 'bg-green-100 text-green-700',
    CLOSED: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/renter/inquiries"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="font-semibold text-gray-900">
                  {inquiry.property.landlord.firstName} {inquiry.property.landlord.lastName}
                </h1>
                <p className="text-sm text-gray-500">Landlord</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[inquiry.status]}`}>
              {inquiry.status}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto">
                <ConversationThread
                  messages={inquiry.messages}
                  currentUserId={session?.user?.id || ''}
                  initialMessage={{
                    message: inquiry.message,
                    phone: inquiry.phone,
                    moveInDate: inquiry.moveInDate,
                    createdAt: inquiry.createdAt,
                    renter: inquiry.renter,
                  }}
                />
              </div>

              {/* Reply Form */}
              <ReplyForm
                inquiryId={inquiry.id}
                onMessageSent={handleMessageSent}
                placeholder={`Reply to ${inquiry.property.landlord.firstName}...`}
              />
            </div>
          </div>

          {/* Sidebar - Property Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Property
              </h3>

              {propertyImage && (
                <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={propertyImage}
                    alt={inquiry.property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h4 className="font-semibold text-gray-900 mb-1">
                {inquiry.property.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {inquiry.property.city}, {inquiry.property.state}
              </p>
              <p className="text-lg font-bold text-purple-600 mb-4">
                ${inquiry.property.monthlyRent.toLocaleString()}/mo
              </p>

              <Link
                href={`/properties/${inquiry.property.id}`}
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                View Property
              </Link>

              {/* Landlord Details */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                  Landlord
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">
                      {inquiry.property.landlord.firstName} {inquiry.property.landlord.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${inquiry.property.landlord.email}`}
                      className="font-medium text-purple-600 hover:text-purple-700"
                    >
                      {inquiry.property.landlord.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Your Inquiry Details */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                  Your Inquiry
                </h3>

                <div className="space-y-3">
                  {inquiry.moveInDate && (
                    <div>
                      <p className="text-sm text-gray-500">Desired Move-in</p>
                      <p className="font-medium text-gray-900">
                        {new Date(inquiry.moveInDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Sent On</p>
                    <p className="font-medium text-gray-900">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
