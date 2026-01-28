'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import {
  generateShareData,
  shareNative,
  copyToClipboard,
  isWebShareSupported,
  generateEmailShareUrl,
  trackShare,
} from '@/lib/utils/shareUtils';
import { Share2, Link2, Mail, Check } from 'lucide-react';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

interface ShareButtonProps {
  property: Property;
}

export default function ShareButton({ property }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareData = generateShareData(property, currentUrl);

  const handleNativeShare = async () => {
    const success = await shareNative(shareData);
    if (success) {
      trackShare('native', property.id);
      setShowMenu(false);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      trackShare('copy', property.id);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    }
  };

  const handleEmailShare = () => {
    const emailUrl = generateEmailShareUrl(property, currentUrl);
    window.location.href = emailUrl;
    trackShare('email', property.id);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        aria-label="Share property"
      >
        <Share2 className="w-6 h-6" />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl z-50 py-2">
            {isWebShareSupported() && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Share...</span>
              </button>
            )}

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Link copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Copy link</span>
                </>
              )}
            </button>

            <button
              onClick={handleEmailShare}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Email</span>
            </button>

            <div className="border-t border-gray-100 my-2" />

            <div className="px-4 py-2">
              <p className="text-xs text-gray-500 mb-2">Share on social media</p>
              <div className="flex items-center gap-2">
                <FacebookShareButton
                  url={currentUrl}
                  onClick={() => trackShare('facebook', property.id)}
                >
                  <FacebookIcon size={36} round />
                </FacebookShareButton>

                <TwitterShareButton
                  url={currentUrl}
                  title={shareData.title}
                  onClick={() => trackShare('twitter', property.id)}
                >
                  <TwitterIcon size={36} round />
                </TwitterShareButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
