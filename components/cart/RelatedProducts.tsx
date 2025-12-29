'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'

const RelatedProducts = () => {
  const relatedProducts = [
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
      price: 25,
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
      id: '19',
      name: 'Milan Top Floor Cleaner - 1L',
      price: 60,
      image: '/products/milan-top-floor-cleaner.png',
      category: 'Floor Care',
      features: ['Quick dry formula', 'Pleasant fragrance', 'Streak-free shine'],
      rating: 4.7,
      reviews: 142,
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            You might also like
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your cleaning routine with these complementary Milan products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product, index) => (
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
      </div>
    </section>
  )
}

export default RelatedProducts