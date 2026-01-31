'use client';

import { useState } from 'react';
import { useSendMessage } from '@/hooks/useConversation';

interface ReplyFormProps {
  inquiryId: string;
  onMessageSent?: () => void;
  placeholder?: string;
}

export default function ReplyForm({
  inquiryId,
  onMessageSent,
  placeholder = 'Type your message...',
}: ReplyFormProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { mutate: sendMessage, isPending: isSubmitting } = useSendMessage(inquiryId);

  const maxLength = 2000;
  const remainingChars = maxLength - content.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || isSubmitting) return;

    setError(null);

    sendMessage(content.trim(), {
      onSuccess: () => {
        setContent('');
        onMessageSent?.();
      },
      onError: (err) => {
        setError(err instanceof Error ? err.message : 'Failed to send message');
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <label htmlFor="reply-message" className="sr-only">
            Message
          </label>
          <textarea
            id="reply-message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={3}
            aria-describedby="reply-hint"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
          <div className={`absolute bottom-2 right-3 text-xs ${
            remainingChars < 100 ? 'text-orange-500' : 'text-gray-400'
          }`}>
            {remainingChars}
          </div>
        </div>

        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="flex-shrink-0 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </>
          )}
        </button>
      </div>

      <p id="reply-hint" className="mt-2 text-xs text-gray-500">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
}
