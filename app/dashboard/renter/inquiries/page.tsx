'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useRenterInquiries } from '@/hooks/useInquiries';

type StatusFilter = 'ALL' | 'PENDING' | 'RESPONDED' | 'UNREAD';

import { useState } from 'react';

export default function InquiriesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const isRenter = session?.user?.accountType === 'RENTER';
  const { data, isLoading: queryLoading } = useRenterInquiries(!!session?.user && isRenter);

  const inquiries = data?.inquiries || [];
  const totalUnread = data?.totalUnread || 0;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      if (session.user.accountType !== 'RENTER') {
        router.push('/dashboard/landlord');
      }
    }
  }, [session, status, router]);

  const filteredInquiries = inquiries.filter(inquiry => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'UNREAD') return inquiry.unreadCount > 0;
    return inquiry.status === statusFilter;
  });

  if (status === 'loading' || queryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user || session.user.accountType !== 'RENTER') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/renter"
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
                ? 'No unread messages'
                : `No ${statusFilter.toLowerCase()} inquiries`}
            </h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === 'ALL'
                ? 'When you contact landlords, your inquiries will appear here'
                : `Try changing the filter to see other inquiries`
              }
            </p>
            {statusFilter === 'ALL' && (
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Properties
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {filteredInquiries.map((inquiry) => {
              const images = typeof inquiry.property.images === 'string'
                ? JSON.parse(inquiry.property.images as string)
                : inquiry.property.images;
              const propertyImage = images?.[0];

              const getPreviewMessage = () => {
                if (inquiry.lastMessage) {
                  return inquiry.lastMessage.content.length > 60
                    ? inquiry.lastMessage.content.substring(0, 60) + '...'
                    : inquiry.lastMessage.content;
                }
                return inquiry.message.length > 60
                  ? inquiry.message.substring(0, 60) + '...'
                  : inquiry.message;
              };

              const formatDate = (dateString: string) => {
                const date = new Date(dateString);
                const now = new Date();
                const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

                if (diffDays === 0) {
                  return date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  });
                } else if (diffDays === 1) {
                  return 'Yesterday';
                } else if (diffDays < 7) {
                  return date.toLocaleDateString('en-US', { weekday: 'short' });
                } else {
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }
              };

              const statusColors: Record<string, string> = {
                PENDING: 'bg-yellow-100 text-yellow-700',
                RESPONDED: 'bg-green-100 text-green-700',
                CLOSED: 'bg-gray-100 text-gray-700',
              };

              return (
                <Link
                  key={inquiry.id}
                  href={`/dashboard/renter/inquiries/${inquiry.id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    {/* Property Image with unread badge */}
                    <div className="flex-shrink-0 relative">
                      {propertyImage ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={propertyImage}
                            alt={inquiry.property.title}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                      )}
                      {inquiry.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {inquiry.unreadCount > 9 ? '9+' : inquiry.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <h3 className={`font-semibold truncate ${inquiry.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                            {inquiry.property.title}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColors[inquiry.status] || statusColors.PENDING}`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {formatDate(inquiry.lastMessage?.createdAt || inquiry.createdAt)}
                        </span>
                      </div>

                      {/* Location and price */}
                      <p className="text-sm text-gray-600 mb-2">
                        {inquiry.property.city}, {inquiry.property.state} • ${inquiry.property.monthlyRent.toLocaleString()}/mo
                      </p>

                      {/* Message preview */}
                      <p className={`text-sm truncate ${inquiry.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                        {getPreviewMessage()}
                      </p>

                      {/* Reply count */}
                      {inquiry._count?.messages > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {inquiry._count.messages} {inquiry._count.messages === 1 ? 'reply' : 'replies'}
                        </p>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex-shrink-0 self-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
