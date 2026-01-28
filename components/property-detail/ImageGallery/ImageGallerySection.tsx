'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from './ImageLightbox';

interface ImageGallerySectionProps {
  images: string[];
  title: string;
}

export default function ImageGallerySection({ images, title }: ImageGallerySectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative h-[500px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="relative mb-8">
        {images.length === 1 ? (
          <button
            onClick={() => openLightbox(0)}
            className="relative h-[500px] w-full rounded-xl overflow-hidden group"
          >
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-lg">
                View Image
              </span>
            </div>
          </button>
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-xl overflow-hidden">
            {/* Large main image */}
            <button
              onClick={() => openLightbox(0)}
              className="relative col-span-2 row-span-2 group overflow-hidden"
            >
              <Image
                src={images[0]}
                alt={`${title} - Main image`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>

            {/* Thumbnail images */}
            {images.slice(1, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx + 1)}
                className="relative group overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${title} - Image ${idx + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}

            {/* Show all photos button (if more than 5 images) */}
            {images.length > 5 && (
              <button
                onClick={() => openLightbox(5)}
                className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Show all {images.length} photos
              </button>
            )}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          title={title}
        />
      )}
    </>
  );
}
