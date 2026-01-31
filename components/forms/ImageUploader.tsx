'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  images,
  onChange,
  maxImages = 10,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleAddImage = useCallback(() => {
    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    if (images.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    if (images.includes(imageUrl)) {
      setError('This image has already been added');
      return;
    }

    onChange([...images, imageUrl]);
    setImageUrl('');
    setError('');
  }, [imageUrl, images, maxImages, onChange]);

  const handleRemoveImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    },
    [images, onChange]
  );

  const handleMoveImage = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= images.length) return;

      const newImages = [...images];
      const [removed] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, removed);
      onChange(newImages);
    },
    [images, onChange]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const text = e.dataTransfer.getData('text/plain');
      if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
        if (images.length < maxImages && !images.includes(text)) {
          onChange([...images, text]);
        }
      }
    },
    [images, maxImages, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddImage();
      }
    },
    [handleAddImage]
  );

  return (
    <div className="space-y-4">
      {/* Add Image Input */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 transition-colors
          ${dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-600 mb-2">Drag and drop an image URL here, or</p>
          <div className="flex gap-2 w-full max-w-md">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste image URL here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={handleAddImage}
              disabled={images.length >= maxImages}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <p className="mt-2 text-xs text-gray-500">
            {images.length}/{maxImages} images added
          </p>
        </div>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200"
            >
              {/* Image */}
              <Image
                src={url}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  // Replace with placeholder on error
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".35em" fill="%239ca3af" font-size="12"%3EImage Error%3C/text%3E%3C/svg%3E';
                }}
              />

              {/* Cover Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded">
                  Cover
                </div>
              )}

              {/* Overlay with controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {/* Move Left */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, index - 1)}
                    className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors"
                    aria-label="Move image left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Move Right */}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, index + 1)}
                    className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors"
                    aria-label="Move image right"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
