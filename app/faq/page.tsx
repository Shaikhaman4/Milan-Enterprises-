'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    id: 1,
    category: 'Orders & Delivery',
    question: 'How do I place an order?',
    answer: 'You can place an order by adding products to your cart and clicking "Order via WhatsApp". This will send your order details directly to our WhatsApp number (+91 92849 92154) where we can confirm your order and arrange delivery.'
  },
  {
    id: 2,
    category: 'Orders & Delivery',
    question: 'What are your delivery areas?',
    answer: 'We currently deliver across India. Delivery charges and timeframes may vary based on your location. Please contact us via WhatsApp for specific delivery information for your area.'
  },
  {
    id: 3,
    category: 'Orders & Delivery',
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 2-5 business days depending on your location. We will provide you with an estimated delivery time when you place your order via WhatsApp.'
  },
  {
    id: 4,
    category: 'Products',
    question: 'Are your products safe for children and pets?',
    answer: 'Yes, all our products are dermatologically tested and formulated to be safe for household use. However, as with all cleaning products, we recommend keeping them out of reach of children and pets, and following the usage instructions on each product.'
  },
  {
    id: 5,
    category: 'Products',
    question: 'Do you offer bulk or wholesale pricing?',
    answer: 'Yes, we offer special pricing for bulk orders. Please contact us via WhatsApp or email with your requirements, and we will provide you with a customized quote.'
  },
  {
    id: 6,
    category: 'Products',
    question: 'What makes Milan Enterprises products different?',
    answer: 'Our products are formulated with premium ingredients for maximum effectiveness while being safe for your family. We focus on quality, affordability, and customer satisfaction with every product we make.'
  },
  {
    id: 7,
    category: 'Payment & Pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including cash on delivery, bank transfers, and digital payments. Payment details will be discussed when you place your order via WhatsApp.'
  },
  {
    id: 8,
    category: 'Payment & Pricing',
    question: 'Do you offer any discounts or promotions?',
    answer: 'Yes, we regularly offer discounts and promotions. Subscribe to our newsletter to stay updated on special offers, and follow us for exclusive deals.'
  },
  {
    id: 9,
    category: 'Support',
    question: 'What if I have an issue with my order?',
    answer: 'If you have any issues with your order, please contact us immediately via WhatsApp (+91 92849 92154) or email (milanentprises75@gmail.com). We are committed to resolving any concerns quickly and to your satisfaction.'
  },
  {
    id: 10,
    category: 'Support',
    question: 'Can I return or exchange products?',
    answer: 'We stand behind the quality of our products. If you are not satisfied with your purchase, please contact us within 7 days of delivery to discuss return or exchange options.'
  },
  {
    id: 11,
    category: 'Support',
    question: 'How can I contact customer support?',
    answer: 'You can reach our customer support team via WhatsApp at +91 92849 92154, email us at milanentprises75@gmail.com, or use the contact form on our website. We respond to all inquiries within 24 hours.'
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]
  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, orders, and services. 
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-lg shadow-sm">
          {filteredFaqs.map((faq, index) => (
            <div key={faq.id} className={`${index !== 0 ? 'border-t border-gray-200' : ''}`}>
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                      {faq.question}
                    </h3>
                  </div>
                  {openItems.includes(faq.id) ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-primary-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-primary-800 mb-6">
            Our customer support team is here to help you with any additional questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919284992154"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2"
            >
              <span>WhatsApp Support</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
            <a
              href="mailto:milanentprises75@gmail.com"
              className="btn-secondary inline-flex items-center justify-center space-x-2"
            >
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}