import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Milan Enterprises',
  description: 'Terms of Service for Milan Enterprises - Terms and conditions for using our website and services',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> December 2024
            </p>

            <p className="text-lg text-gray-700 mb-8">
              Welcome to Milan Enterprises. These Terms of Service ("Terms") govern your use 
              of our website and services. By accessing or using our services, you agree to 
              be bound by these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-6">
              By accessing and using this website, you accept and agree to be bound by the 
              terms and provision of this agreement. If you do not agree to abide by the 
              above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Products and Services
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• We offer cleaning products and household items for sale</li>
              <li>• Product descriptions and prices are subject to change without notice</li>
              <li>• We reserve the right to limit quantities and discontinue products</li>
              <li>• All products are subject to availability</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Ordering and Payment
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Orders are placed through our WhatsApp ordering system</li>
              <li>• All orders are subject to acceptance and availability</li>
              <li>• We reserve the right to refuse or cancel any order</li>
              <li>• Payment terms will be discussed during order confirmation</li>
              <li>• Prices are in Indian Rupees (₹) and include applicable taxes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Delivery and Shipping
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Delivery areas and charges vary by location</li>
              <li>• Delivery timeframes are estimates and not guaranteed</li>
              <li>• Risk of loss passes to you upon delivery</li>
              <li>• You must provide accurate delivery information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Returns and Refunds
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• We stand behind the quality of our products</li>
              <li>• Returns must be requested within 7 days of delivery</li>
              <li>• Products must be in original condition for return</li>
              <li>• Refund processing may take 5-10 business days</li>
              <li>• Return shipping costs may apply</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Product Safety and Usage
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Follow all product instructions and safety guidelines</li>
              <li>• Keep products away from children and pets</li>
              <li>• Use products only for their intended purpose</li>
              <li>• Discontinue use if adverse reactions occur</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Website Use
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• You may use our website for lawful purposes only</li>
              <li>• Do not attempt to interfere with website functionality</li>
              <li>• Do not use automated systems to access our website</li>
              <li>• Respect intellectual property rights</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Intellectual Property
            </h2>
            <p className="text-gray-700 mb-6">
              All content on this website, including text, graphics, logos, images, and 
              software, is the property of Milan Enterprises and is protected by copyright 
              and other intellectual property laws. You may not reproduce, distribute, or 
              create derivative works without our written permission.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-6">
              Milan Enterprises shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to loss of 
              profits, data, or use, incurred by you or any third party, whether in an 
              action in contract or tort, even if we have been advised of the possibility 
              of such damages.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              10. Indemnification
            </h2>
            <p className="text-gray-700 mb-6">
              You agree to indemnify and hold harmless Milan Enterprises from any claims, 
              damages, or expenses arising from your use of our products or services, or 
              your violation of these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              11. Privacy Policy
            </h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which 
              also governs your use of our services, to understand our practices.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              12. Modifications
            </h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these Terms at any time. Changes will be 
              effective immediately upon posting on our website. Your continued use of 
              our services after such changes constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              13. Governing Law
            </h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be governed by and construed in accordance with the laws 
              of India. Any disputes arising under these Terms shall be subject to the 
              exclusive jurisdiction of the courts of India.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              14. Severability
            </h2>
            <p className="text-gray-700 mb-6">
              If any provision of these Terms is found to be unenforceable or invalid, 
              that provision shall be limited or eliminated to the minimum extent necessary 
              so that these Terms shall otherwise remain in full force and effect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              15. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> milanentprises75@gmail.com</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 92849 92154</p>
              <p className="text-gray-700"><strong>Address:</strong> Badlapur, Thane, Maharashtra</p>
            </div>

            <div className="bg-primary-50 rounded-lg p-6 mt-8">
              <p className="text-primary-800 text-sm">
                <strong>Note:</strong> By using our services, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}