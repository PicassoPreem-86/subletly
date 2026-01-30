'use client';

import { FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { PropertyFormData } from '../PropertyForm';
import ImageUploader from '../ImageUploader';

interface ImagesStepProps {
  errors: FieldErrors<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
  setValue: UseFormSetValue<PropertyFormData>;
}

export default function ImagesStep({ errors, watch, setValue }: ImagesStepProps) {
  const images = watch('images') || [];

  const handleImagesChange = (newImages: string[]) => {
    setValue('images', newImages, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Photos</h2>
        <p className="text-gray-600">Add photos to showcase your property</p>
      </div>

      {/* Tips */}
      <div className="bg-purple-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-purple-900 mb-2">Photo Tips</h3>
        <ul className="space-y-1 text-sm text-purple-700">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>The first photo will be your cover image shown in search results</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Include photos of every room, especially bedroom, bathroom, and kitchen</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Use natural lighting and show the space from multiple angles</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Listings with 5+ photos get significantly more inquiries</span>
          </li>
        </ul>
      </div>

      {/* Image Uploader */}
      <ImageUploader
        images={images}
        onChange={handleImagesChange}
        maxImages={10}
      />

      {errors.images && (
        <p className="text-sm text-red-600">{errors.images.message}</p>
      )}

      {/* Photo Count */}
      <div className="text-center text-sm text-gray-500">
        {images.length === 0 ? (
          <span>No photos uploaded yet. We recommend at least 5 photos.</span>
        ) : images.length < 5 ? (
          <span>You have {images.length} photo{images.length !== 1 ? 's' : ''}. Consider adding {5 - images.length} more for best results.</span>
        ) : (
          <span className="text-green-600 font-medium">Great! You have {images.length} photos.</span>
        )}
      </div>
    </div>
  );
}
