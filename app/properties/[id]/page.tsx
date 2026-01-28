'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { usePropertyData } from '@/hooks/usePropertyData';

// Image Gallery
import ImageGallerySection from '@/components/property-detail/ImageGallery/ImageGallerySection';

// Property Header
import PropertyHeader from '@/components/property-detail/PropertyHeader/PropertyHeader';

// Property Info
import KeyFeaturesCard from '@/components/property-detail/PropertyInfo/KeyFeaturesCard';
import PropertyHighlights from '@/components/property-detail/PropertyInfo/PropertyHighlights';
import DescriptionSection from '@/components/property-detail/PropertyInfo/DescriptionSection';
import AmenitiesGrid from '@/components/property-detail/PropertyInfo/AmenitiesGrid';

// Sidebar
import PriceCard from '@/components/property-detail/Sidebar/PriceCard';
import ContactForm from '@/components/property-detail/Sidebar/ContactForm';
import LandlordCard from '@/components/property-detail/Sidebar/LandlordCard';

// FAQ
import FAQAccordion from '@/components/property-detail/FAQ/FAQAccordion';

// Similar Properties
import SimilarPropertiesSection from '@/components/property-detail/SimilarProperties/SimilarPropertiesSection';

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();

  const { property, isSaved, isLoading, error, toggleSave } = usePropertyData(
    params.id,
    session?.user?.id
  );

  const [showContactForm, setShowContactForm] = useState(false);

  const handleSaveToggle = async () => {
    if (!session?.user) {
      router.push('/login');
      return;
    }

    try {
      await toggleSave();
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  const handleContactClick = () => {
    if (!session?.user) {
      router.push('/login');
    } else {
      setShowContactForm(true);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Property not found'}
          </h1>
          <Link href="/browse" className="text-purple-600 hover:text-purple-700">
            Browse all properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/subletly-logo.png"
                alt="Subletly"
                width={300}
                height={75}
                className="h-16 w-auto"
                priority
              />
            </Link>
            <Link
              href="/browse"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              ← Back to Browse
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header with Breadcrumbs */}
        <PropertyHeader
          property={property}
          isSaved={isSaved}
          onSaveToggle={handleSaveToggle}
        />

        {/* Image Gallery */}
        <ImageGallerySection images={property.images || []} title={property.title} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Features */}
            <KeyFeaturesCard property={property} />

            {/* Property Highlights */}
            <PropertyHighlights property={property} />

            {/* Description */}
            <DescriptionSection description={property.description} />

            {/* Amenities */}
            <AmenitiesGrid amenities={property.amenities || []} />

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      property.furnished ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-gray-700">
                    {property.furnished ? 'Furnished' : 'Unfurnished'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      property.petsAllowed ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-gray-700">
                    {property.petsAllowed ? 'Pets Allowed' : 'No Pets'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      property.parking ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-gray-700">
                    {property.parking ? 'Parking Available' : 'No Parking'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      property.utilities ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-gray-700">
                    {property.utilities ? 'Utilities Included' : 'Utilities Not Included'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      !property.smoking ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-gray-700">
                    {property.smoking ? 'Smoking Allowed' : 'No Smoking'}
                  </span>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <FAQAccordion property={property} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Price Card or Contact Form */}
            {showContactForm ? (
              <ContactForm
                propertyId={params.id}
                onClose={() => setShowContactForm(false)}
              />
            ) : (
              <PriceCard property={property} onContactClick={handleContactClick} />
            )}

            {/* Landlord Card */}
            <LandlordCard
              landlord={property.landlord}
              propertyCreatedAt={property.createdAt}
            />
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarPropertiesSection currentProperty={property} />
      </main>
    </div>
  );
}
