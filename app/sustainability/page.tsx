import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sustainability - Milan Enterprises',
  description: 'Our commitment to environmental responsibility and sustainable practices',
}

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Our Commitment to Sustainability
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              At Milan Enterprises, we believe in creating products that are not only effective 
              but also responsible towards our environment and community.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Environmental Responsibility
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Eco-friendly formulations that are safe for your family and pets</li>
              <li>• Biodegradable ingredients that don't harm waterways</li>
              <li>• Recyclable packaging materials wherever possible</li>
              <li>• Reduced plastic usage in our product designs</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Quality & Safety
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Dermatologically tested products safe for daily use</li>
              <li>• Non-toxic formulations for household safety</li>
              <li>• Quality assurance at every step of production</li>
              <li>• Compliance with national safety standards</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Community Impact
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Supporting local communities through responsible sourcing</li>
              <li>• Affordable pricing to make quality products accessible</li>
              <li>• Continuous innovation for better, safer products</li>
              <li>• Transparent business practices</li>
            </ul>

            <div className="bg-primary-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                Our Promise
              </h3>
              <p className="text-primary-800">
                We are committed to continuously improving our environmental impact 
                while delivering the premium quality and effectiveness our customers trust. 
                Together, we can create cleaner homes and a cleaner planet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}