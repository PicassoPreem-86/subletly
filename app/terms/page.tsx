import Image from 'next/image';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
            Terms of Service
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using Subletly (&quot;the Platform&quot;), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the Platform.
            </p>
            <p className="text-gray-700">
              Subletly is a technology platform that connects individuals seeking to sublet their residential spaces
              (&quot;Hosts&quot;) with individuals seeking temporary housing (&quot;Guests&quot;). We are not a real estate broker,
              property manager, or landlord.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
            <p className="text-gray-700 mb-4">
              To use Subletly, you must:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Have the legal right to enter into binding contracts</li>
              <li>Not be prohibited from using the Platform under applicable law</li>
              <li>Provide accurate and complete registration information</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities that occur under your account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and complete information during registration</li>
              <li>Keep your account information up to date</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not share your account credentials with others</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Host Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              If you list a property on Subletly, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You have the legal right to sublet the property, including any required landlord consent</li>
              <li>Your listing is accurate and does not misrepresent the property</li>
              <li>You will comply with all applicable laws, including local housing regulations</li>
              <li>You will honor confirmed bookings unless extraordinary circumstances arise</li>
              <li>You will maintain appropriate insurance coverage</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Guest Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              If you book a sublet through Subletly, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use the property only for lawful purposes and in accordance with the listing terms</li>
              <li>Treat the property with care and respect</li>
              <li>Comply with all house rules and building regulations</li>
              <li>Not exceed the maximum occupancy specified in the listing</li>
              <li>Leave the property in the same condition as you found it</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payments and Fees</h2>
            <p className="text-gray-700 mb-4">
              Subletly facilitates payments between Hosts and Guests through our secure escrow system:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Funds are held in escrow for 24-48 hours after move-in</li>
              <li>Payment is released to the Host once the Guest confirms the property matches the listing</li>
              <li>Subletly charges a service fee for facilitating transactions</li>
              <li>All fees are clearly disclosed before booking confirmation</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancellation Policy</h2>
            <p className="text-gray-700 mb-4">
              Cancellation policies are set by Hosts and displayed on each listing. Common policies include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Flexible:</strong> Full refund up to 24 hours before check-in</li>
              <li><strong>Moderate:</strong> Full refund up to 5 days before check-in</li>
              <li><strong>Strict:</strong> 50% refund up to 7 days before check-in</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Please review the cancellation policy carefully before booking.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Activities</h2>
            <p className="text-gray-700 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use the Platform for any illegal purpose</li>
              <li>Post false, misleading, or fraudulent listings</li>
              <li>Harass, abuse, or discriminate against other users</li>
              <li>Circumvent or manipulate our fee structure</li>
              <li>Scrape or collect user data without authorization</li>
              <li>Interfere with the proper functioning of the Platform</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Subletly is a platform that facilitates connections between Hosts and Guests. We are not responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The accuracy of listings or user-provided information</li>
              <li>The quality, safety, or legality of listed properties</li>
              <li>Disputes between Hosts and Guests</li>
              <li>Any damages arising from your use of the Platform</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To the maximum extent permitted by law, Subletly&apos;s liability is limited to the fees you paid to us.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              We encourage users to resolve disputes directly. If you cannot reach a resolution,
              Subletly offers mediation services through our Trust & Safety team. For unresolved disputes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You agree to attempt informal resolution for at least 30 days</li>
              <li>Any claims must be brought individually, not as part of a class action</li>
              <li>Binding arbitration applies to all disputes not resolved informally</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms from time to time. We will notify you of material changes via email
              or through the Platform. Your continued use of Subletly after changes become effective
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-700 mt-2">
              Email: <a href="mailto:legal@subletly.com" className="text-purple-600 hover:text-purple-700">legal@subletly.com</a>
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
              <Link href="/terms" className="text-white hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
