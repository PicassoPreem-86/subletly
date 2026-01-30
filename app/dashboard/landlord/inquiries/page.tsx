'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import InquiryCard from '@/components/messaging/InquiryCard';

interface InquiryData {
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
    images: string;
  };
  renter: {
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

type StatusFilter = 'ALL' | 'PENDING' | 'RESPONDED' | 'UNREAD';

export default function LandlordInquiriesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      if (session.user.accountType !== 'LANDLORD') {
        router.push('/dashboard/renter');
        return;
      }
      fetchInquiries();
    }
  }, [session, status, router]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/landlord/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries || []);
        setTotalUnread(data.totalUnread || 0);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'UNREAD') return inquiry.unreadCount > 0;
    return inquiry.status === statusFilter;
  });

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user || session.user.accountType !== 'LANDLORD') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/subletly-logo.png"
                alt="Subletly"
                width={400}
                height={100}
                className="h-20 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/landlord"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/landlord"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
            {totalUnread > 0 && (
              <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold">
                {totalUnread} unread
              </span>
            )}
          </div>
          <p className="text-gray-600">
            {filteredInquiries.length} {filteredInquiries.length === 1 ? 'inquiry' : 'inquiries'}
            {statusFilter !== 'ALL' && ` (${statusFilter.toLowerCase()})`}
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'ALL'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setStatusFilter('UNREAD')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'UNREAD'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            Unread ({inquiries.filter(i => i.unreadCount > 0).length})
          </button>
          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'PENDING'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            Pending ({inquiries.filter(i => i.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setStatusFilter('RESPONDED')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'RESPONDED'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            Responded ({inquiries.filter(i => i.status === 'RESPONDED').length})
          </button>
        </div>

        {/* Inquiries List */}
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {statusFilter === 'ALL'
                ? 'No inquiries yet'
                : statusFilter === 'UNREAD'
                ? 'No unread inquiries'
                : `No ${statusFilter.toLowerCase()} inquiries`}
            </h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === 'ALL'
                ? 'When renters contact you about your properties, their inquiries will appear here'
                : 'Try changing the filter to see other inquiries'}
            </p>
            {statusFilter === 'ALL' && (
              <Link
                href="/dashboard/landlord"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                View My Properties
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {filteredInquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
                linkPrefix="/dashboard/landlord/inquiries"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
