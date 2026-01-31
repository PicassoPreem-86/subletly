import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/subletly-logo.png"
                alt="Subletly"
                width={300}
                height={75}
                className="h-14 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-700 transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-teal-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              At Subletly, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-gray-700">
              By using Subletly, you consent to the data practices described in this policy.
              If you do not agree with the terms of this policy, please do not access or use the Platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We may collect personal information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Account credentials (password)</li>
              <li>Profile information (photo, bio)</li>
              <li>Identity verification documents</li>
              <li>Payment information (processed securely by our payment partners)</li>
              <li>Communications through the Platform</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Property Information</h3>
            <p className="text-gray-700 mb-4">
              If you list a property, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Property address and location</li>
              <li>Property descriptions and amenities</li>
              <li>Photos and virtual tours</li>
              <li>Pricing and availability</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">
              When you use our Platform, we automatically collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide and maintain our Platform</li>
              <li>Process transactions and send related notifications</li>
              <li>Verify user identities and prevent fraud</li>
              <li>Enable communication between Hosts and Guests</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve and personalize your experience</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce our Terms of Service</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We may share your information in the following circumstances:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">With Other Users</h3>
            <p className="text-gray-700 mb-4">
              When you book or list a property, we share relevant information with the other party
              (e.g., Host name and property details with Guests, Guest contact info with Hosts after booking).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">With Service Providers</h3>
            <p className="text-gray-700 mb-4">
              We work with third-party companies to provide services such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Payment processing</li>
              <li>Identity verification</li>
              <li>Email and communication services</li>
              <li>Analytics and performance monitoring</li>
              <li>Customer support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">For Legal Purposes</h3>
            <p className="text-gray-700">
              We may disclose information when required by law, to protect our rights,
              or in response to valid legal requests from authorities.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your information, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure payment processing through certified partners</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication requirements</li>
            </ul>
            <p className="text-gray-700 mt-4">
              However, no method of transmission over the Internet is 100% secure.
              While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a portable copy of your data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Withdraw consent:</strong> Revoke consent for data processing where applicable</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us at the email address below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Authenticate your account</li>
              <li>Analyze traffic and usage patterns</li>
              <li>Deliver relevant advertising</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can control cookies through your browser settings. Note that disabling cookies
              may affect some features of the Platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information for as long as necessary to provide our services,
              comply with legal obligations, resolve disputes, and enforce our agreements.
              When your information is no longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700">
              Subletly is not intended for users under 18 years of age. We do not knowingly collect
              personal information from children. If you believe we have collected information from
              a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries other than your own.
              We ensure appropriate safeguards are in place to protect your information in accordance
              with this Privacy Policy and applicable law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by email or through the Platform. Your continued use of Subletly after changes
              become effective constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-gray-700 mt-2">
              Email: <a href="mailto:privacy@subletly.com" className="text-purple-600 hover:text-purple-700">privacy@subletly.com</a>
            </p>
            <p className="text-gray-700 mt-2">
              You may also contact us to exercise your privacy rights or submit a complaint.
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Subletly. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-white hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
