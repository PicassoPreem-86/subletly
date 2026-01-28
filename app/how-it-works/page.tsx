import Image from "next/image";
import Header from "@/components/Header";

export const metadata = {
  title: 'How It Works | Subletly',
  description: 'Learn how Subletly makes subletting simple, secure, and trustworthy with our three-step process.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, secure subletting process built on trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-64 h-64 mb-6 mx-auto relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/get-verified.png"
                  alt="Get Verified"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Get Verified</h2>
              <p className="text-gray-600">
                Complete ID, phone, and property verification. Earn &quot;Verified Landlord&quot; or &quot;Verified Renter&quot; badges for enhanced trust.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-64 h-64 mb-6 mx-auto relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/list-search.png"
                  alt="List or Search"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. List or Search</h2>
              <p className="text-gray-600">
                Post your sublet with legal templates provided, or search verified listings. All communication stays secure on-platform.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-64 h-64 mb-6 mx-auto relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/book-securely.png"
                  alt="Book Securely"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Book Securely</h2>
              <p className="text-gray-600">
                Pay through escrow. Funds held for 24-48 hours after move-in. Confirm everything&apos;s good, then payment releases to host.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Subletly?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A tech platform (not a broker) built on trust, transparency, and legal compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-6 p-6 bg-white rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#5B3DF0]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#5B3DF0]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Tech Platform, Not a Broker</h3>
                <p className="text-gray-600">
                  We connect sublessors and sublessees directly. No broker fees, no middleman commissions—just platform tools and secure infrastructure for your transactions.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6 p-6 bg-white rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#2CD4A7]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#2CD4A7]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Dual-Sided Verification</h3>
                <p className="text-gray-600">
                  Unlike other platforms, we verify BOTH parties. Earn &quot;Verified Landlord,&quot; &quot;Trusted Landlord,&quot; or &quot;Verified Renter&quot; badges through our multi-layer vetting process.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6 p-6 bg-white rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Legal Compliance First</h3>
                <p className="text-gray-600">
                  NYC-specific templates for sublease agreements and landlord consent letters. Digital acknowledgments ensure users know their legal responsibilities—education over gatekeeping.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-6 p-6 bg-white rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#5B3DF0]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#5B3DF0]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">24-48 Hour Escrow Protection</h3>
                <p className="text-gray-600">
                  Funds held in secure escrow until 24-48 hours after move-in. Confirm the property matches the listing before payment releases—drastically reducing scam risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
