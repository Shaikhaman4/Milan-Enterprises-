import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Milan Enterprises',
  description: 'Privacy Policy for Milan Enterprises - How we collect, use, and protect your information',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> December 2024
            </p>

            <p className="text-lg text-gray-700 mb-8">
              At Milan Enterprises, we are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we 
              collect, use, and safeguard your information when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Name and contact information (phone number, email address)</li>
              <li>• Delivery address for order fulfillment</li>
              <li>• Communication preferences</li>
              <li>• Order history and product preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Website usage data and analytics</li>
              <li>• Device information and browser type</li>
              <li>• IP address and location data (general area only)</li>
              <li>• Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Process and fulfill your orders</li>
              <li>• Communicate with you about your orders and our products</li>
              <li>• Provide customer support and respond to inquiries</li>
              <li>• Send promotional materials (only with your consent)</li>
              <li>• Improve our website and services</li>
              <li>• Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• With delivery partners to fulfill your orders</li>
              <li>• With service providers who assist in our operations (under strict confidentiality agreements)</li>
              <li>• When required by law or to protect our legal rights</li>
              <li>• With your explicit consent</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or 
              destruction. However, no method of transmission over the internet is 100% secure, 
              and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Access and review your personal information</li>
              <li>• Request correction of inaccurate information</li>
              <li>• Request deletion of your personal information</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Withdraw consent for data processing</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 mb-6">
              Our website uses cookies to enhance your browsing experience, analyze website 
              traffic, and personalize content. You can control cookie settings through your 
              browser preferences, though some features may not function properly if cookies are disabled.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-700 mb-6">
              Our website may contain links to third-party websites. We are not responsible 
              for the privacy practices of these external sites. We encourage you to review 
              their privacy policies before providing any personal information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for children under 13 years of age. We do not 
              knowingly collect personal information from children under 13. If we become 
              aware of such collection, we will take steps to delete the information promptly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of 
              any material changes by posting the new policy on our website and updating 
              the "Last updated" date. Your continued use of our services after such 
              changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> milanentprises75@gmail.com</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 92849 92154</p>
              <p className="text-gray-700"><strong>Address:</strong> Badlapur, Thane, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}