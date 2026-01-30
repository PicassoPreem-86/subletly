'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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

interface InitialMessage {
  message: string;
  phone?: string | null;
  moveInDate?: string | null;
  createdAt: string;
  renter: {
    firstName: string;
    lastName: string;
    image: string | null;
  };
}

interface ConversationThreadProps {
  messages: Message[];
  currentUserId: string;
  initialMessage: InitialMessage;
}

export default function ConversationThread({
  messages,
  currentUserId,
  initialMessage,
}: ConversationThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      return 'Yesterday ' + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto max-h-[500px]">
      {/* Initial inquiry message */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {initialMessage.renter.image ? (
            <Image
              src={initialMessage.renter.image}
              alt={`${initialMessage.renter.firstName} ${initialMessage.renter.lastName}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">
                {getInitials(initialMessage.renter.firstName, initialMessage.renter.lastName)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 max-w-[80%]">
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-sm text-gray-900">{initialMessage.message}</p>
            {(initialMessage.phone || initialMessage.moveInDate) && (
              <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-600">
                {initialMessage.phone && (
                  <p>Phone: {initialMessage.phone}</p>
                )}
                {initialMessage.moveInDate && (
                  <p>Move-in: {new Date(initialMessage.moveInDate).toLocaleDateString()}</p>
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-2">
            {formatDate(initialMessage.createdAt)}
          </p>
        </div>
      </div>

      {/* Thread messages */}
      {messages.map((message) => {
        const isOwnMessage = message.sender.id === currentUserId;

        return (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
          >
            <div className="flex-shrink-0">
              {message.sender.image ? (
                <Image
                  src={message.sender.image}
                  alt={`${message.sender.firstName} ${message.sender.lastName}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isOwnMessage ? 'bg-purple-600' : 'bg-gray-200'
                }`}>
                  <span className={`font-semibold text-sm ${
                    isOwnMessage ? 'text-white' : 'text-gray-600'
                  }`}>
                    {getInitials(message.sender.firstName, message.sender.lastName)}
                  </span>
                </div>
              )}
            </div>
            <div className={`flex-1 max-w-[80%] ${isOwnMessage ? 'text-right' : ''}`}>
              <div
                className={`inline-block px-4 py-3 rounded-2xl ${
                  isOwnMessage
                    ? 'bg-purple-600 text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <div className={`flex items-center gap-1 mt-1 ${isOwnMessage ? 'justify-end mr-2' : 'ml-2'}`}>
                <p className="text-xs text-gray-500">
                  {formatDate(message.createdAt)}
                </p>
                {isOwnMessage && message.readAt && (
                  <span className="text-xs text-purple-500" title={`Read ${formatDate(message.readAt)}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}
