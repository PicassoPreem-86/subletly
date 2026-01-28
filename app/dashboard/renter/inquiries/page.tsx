'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Header from '@/components/Header';

interface Inquiry {
  id: string;
  message: string;
  status: string;
  property: {
    id: string;
    title: string;
    city: string;
    state: string;
    monthlyRent: number;
  };
  createdAt: string;
}

type StatusFilter = 'ALL' | 'PENDING' | 'RESPONDED';

export default function InquiriesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      if (session.user.accountType !== 'RENTER') {
        router.push('/dashboard/landlord');
        return;
      }
      fetchInquiries();
    }
  }, [session, status, router]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries || []);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (statusFilter === 'ALL') return true;
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
          </div>
          <p className="text-gray-600">
            {filteredInquiries.length} {filteredInquiries.length === 1 ? 'inquiry' : 'inquiries'}
            {statusFilter !== 'ALL' && ` (${statusFilter.toLowerCase()})`}
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'ALL'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'PENDING'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pending ({inquiries.filter(i => i.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setStatusFilter('RESPONDED')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'RESPONDED'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
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
              {statusFilter === 'ALL' ? 'No inquiries yet' : `No ${statusFilter.toLowerCase()} inquiries`}
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
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {filteredInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{inquiry.property.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        inquiry.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        inquiry.status === 'RESPONDED' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {inquiry.property.city}, {inquiry.property.state} • ${inquiry.property.monthlyRent.toLocaleString()}/mo
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Your message:</p>
                      <p className="text-sm text-gray-600">{inquiry.message}</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      Sent {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Link
                    href={`/properties/${inquiry.property.id}`}
                    className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm whitespace-nowrap"
                  >
                    View Property →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
