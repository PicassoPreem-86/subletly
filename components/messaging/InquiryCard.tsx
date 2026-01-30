'use client';

import Link from 'next/link';
import Image from 'next/image';

interface InquiryCardProps {
  inquiry: {
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
  };
  linkPrefix: string;
}

export default function InquiryCard({ inquiry, linkPrefix }: InquiryCardProps) {
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

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

  const getLastActivityTime = () => {
    if (inquiry.lastMessage) {
      return formatDate(inquiry.lastMessage.createdAt);
    }
    return formatDate(inquiry.createdAt);
  };

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
    <Link
      href={`${linkPrefix}/${inquiry.id}`}
      className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          {inquiry.renter.image ? (
            <Image
              src={inquiry.renter.image}
              alt={`${inquiry.renter.firstName} ${inquiry.renter.lastName}`}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-semibold">
                {getInitials(inquiry.renter.firstName, inquiry.renter.lastName)}
              </span>
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
              <h3 className={`font-semibold text-gray-900 truncate ${inquiry.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                {inquiry.renter.firstName} {inquiry.renter.lastName}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status] || statusColors.PENDING}`}>
                {inquiry.status}
              </span>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {getLastActivityTime()}
            </span>
          </div>

          {/* Property info */}
          <div className="flex items-center gap-2 mb-2">
            {propertyImage && (
              <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={propertyImage}
                  alt={inquiry.property.title}
                  width={24}
                  height={24}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <p className="text-sm text-gray-600 truncate">
              {inquiry.property.title} • ${inquiry.property.monthlyRent.toLocaleString()}/mo
            </p>
          </div>

          {/* Message preview */}
          <p className={`text-sm truncate ${inquiry.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            {getPreviewMessage()}
          </p>

          {/* Message count */}
          {inquiry._count.messages > 0 && (
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
}
