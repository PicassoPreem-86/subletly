import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-36 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/subletly-logo.png"
                alt="Subletly"
                width={480}
                height={120}
                className="h-28 w-auto"
                priority
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/browse" className="text-gray-700 hover:text-[#5B3DF0] transition-colors font-medium">
                Browse
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#5B3DF0] transition-colors font-medium">
                How It Works
              </Link>
              <a href="#about" className="text-gray-700 hover:text-[#5B3DF0] transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-[#5B3DF0] transition-colors font-medium">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hidden sm:block text-gray-700 hover:text-[#5B3DF0] transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#5B3DF0] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#4a2fd9] transition-all hover:shadow-lg hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-apartment.png"
            alt="Modern luxury apartment"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-36">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Safe, Flexible Subletting<br />
            <span className="text-[#2CD4A7]">Made Simple</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
            A tech platform connecting verified sublessors and sublessees in NYC & Atlanta.<br />
            <span className="text-white/80">Trust, transparency, and legal compliance built-in.</span>
          </p>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Location */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Manhattan, Brooklyn, Queens..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF0] focus:border-transparent"
                />
              </div>

              {/* Move-in Date */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Move-in
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF0] focus:border-transparent"
                />
              </div>

              {/* Move-out Date */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Move-out
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3DF0] focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full lg:w-auto bg-gradient-to-r from-[#5B3DF0] to-[#7c5fef] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5B3DF0]/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-[#5B3DF0]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dual Verification</h3>
              <p className="text-gray-600 text-sm">ID, phone, and property verification for both parties</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2CD4A7]/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-[#2CD4A7]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24-48 Hour Escrow</h3>
              <p className="text-gray-600 text-sm">Funds held until move-in confirmed</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B35]/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Legal Templates</h3>
              <p className="text-gray-600 text-sm">Sublease agreements & landlord consent letters</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5B3DF0]/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-[#5B3DF0]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Safety Team</h3>
              <p className="text-gray-600 text-sm">Dedicated support & dispute resolution</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Get Verified</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2. List or Search</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Book Securely</h3>
              <p className="text-gray-600">
                Pay through escrow. Funds held for 24-48 hours after move-in. Confirm everything&apos;s good, then payment releases to host.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Featured Listings
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked sublets in prime NYC locations
              </p>
            </div>
            <button className="hidden sm:block bg-[#5B3DF0] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4a2fd9] transition-all hover:shadow-lg">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Listing Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-purple-400 to-pink-500">
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#2CD4A7]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">Verified</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modern 1BR in Manhattan</h3>
                <p className="text-gray-600 mb-4">Upper West Side • Available Jan-Mar 2025</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#5B3DF0]">$2,800<span className="text-sm text-gray-500">/mo</span></span>
                  <button className="text-[#5B3DF0] font-semibold hover:underline">View Details →</button>
                </div>
              </div>
            </div>

            {/* Listing Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-cyan-500">
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#2CD4A7]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">Verified</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Luxury Studio in Brooklyn</h3>
                <p className="text-gray-600 mb-4">Williamsburg • Available Feb-Apr 2025</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#5B3DF0]">$2,200<span className="text-sm text-gray-500">/mo</span></span>
                  <button className="text-[#5B3DF0] font-semibold hover:underline">View Details →</button>
                </div>
              </div>
            </div>

            {/* Listing Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-teal-400 to-emerald-500">
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#2CD4A7]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">Verified</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Spacious 2BR in Queens</h3>
                <p className="text-gray-600 mb-4">Astoria • Available Now</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#5B3DF0]">$3,200<span className="text-sm text-gray-500">/mo</span></span>
                  <button className="text-[#5B3DF0] font-semibold hover:underline">View Details →</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center sm:hidden">
            <button className="bg-[#5B3DF0] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4a2fd9] transition-all hover:shadow-lg">
              View All Listings
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Subletly */}
      <section className="py-20 bg-white">
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
            <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
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
            <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
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
            <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
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
            <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <Image
                src="/subletly-logo.png"
                alt="Subletly"
                width={200}
                height={50}
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm">
                NYC&apos;s most trusted subletting platform. Find your perfect sublet with verified hosts and secure payments.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Listings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">Get the latest listings and updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#5B3DF0] text-white"
                />
                <button className="bg-[#5B3DF0] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4a2fd9] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Subletly. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
