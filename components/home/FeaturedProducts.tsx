'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ui/ProductCard'

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: '22',
      name: 'Milan Washing Powder - 1KG',
      price: 35,
      image: '/products/milan-washing-powder.png',
      category: 'Laundry',
      features: ['Powerful stain removal', 'Fresh fragrance', 'Fabric softness', 'New improved formula'],
      rating: 4.6,
      reviews: 124,
    },
    {
      id: '21',
      name: 'Milan Bleach Aala Liquid',
      price: 25, // Default to 1L price
      image: '/products/milan-bleach-aala-liquid.png',
      category: 'Household Items',
      features: ['Superior quality', 'Effective bleaching', 'Multi-purpose use', 'Safe formula'],
      rating: 4.5,
      reviews: 87,
      variants: [
        { size: '1L', price: 25 },
        { size: '5L', price: 100 }
      ]
    },
    {
      id: '20',
      name: 'Milan Dhamaka Liquid Detergent All Purpose - 1L',
      price: 50,
      image: '/products/milan-dhamaka-liquid-detergent.png',
      category: 'Household Items',
      features: ['All purpose cleaner', 'Safe to use', 'Effective cleaning', 'Pleasant fragrance'],
      rating: 4.6,
      reviews: 98,
    },
    {
      id: '19',
      name: 'Milan Top Floor Cleaner - 1L',
      price: 60,
      image: '/products/milan-top-floor-cleaner.png',
      category: 'Floor Care',
      features: ['Quick dry formula', 'Pleasant fragrance', 'Streak-free shine'],
      rating: 4.7,
      reviews: 142,
    },
    {
      id: '17',
      name: 'Milan Top Super Shine Liquid Soap - 1L',
      price: 40,
      image: '/products/milan-top-liquid-soap.png',
      category: 'Kitchen',
      features: ['Super shine formula', 'Cuts through grease', 'Pleasant fragrance'],
      rating: 4.8,
      reviews: 156,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our most popular cleaning solutions, trusted by thousands of satisfied customers.
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Floor Care', 'Kitchen', 'Household Items', 'Laundry'].map((category, index) => (
              <button
                key={`category-${index}-${category}`}
                className="px-4 py-2 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm font-medium"
                suppressHydrationWarning={true}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/products" className="btn-primary inline-flex items-center space-x-2">
            <span>View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts