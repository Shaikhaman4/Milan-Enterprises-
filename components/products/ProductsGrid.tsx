'use client'

interface ProductsGridProps {
  sortBy: string
  filters: {[key: string]: string[]}
}

import { motion } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'
import { useMemo } from 'react'

const ProductsGrid = ({ sortBy, filters }: ProductsGridProps) => {
  // Milan products only
  const allProducts = [
    {
      id: '27',
      name: 'Milan White Lemon Grass Cleaner - 1L',
      price: 50,
      image: '/products/milan-white-lemon-grass-cleaner.png',
      category: 'Household Items',
      features: ['Lemon grass fragrance', 'Natural cleaning power', 'Multi-surface use', 'Fresh scent'],
      rating: 4.5,
      reviews: 76,
    },
    {
      id: '26',
      name: 'Milan Rexipic Toilet Cleaner - 500ml',
      price: 40,
      image: '/products/milan-rexipic-toilet-cleaner.png',
      category: 'Bathroom',
      features: ['Double action cleaning', 'Superior clearing', 'Germ protection', 'Fresh fragrance'],
      rating: 4.7,
      reviews: 92,
    },
    {
      id: '25',
      name: 'Milan Milon Glass Cleaner',
      price: 40,
      image: '/products/milan-milon-glass-cleaner.png',
      category: 'Glass Care',
      features: ['Streak-free shine', 'Crystal clear results', 'Easy spray application', 'Quick drying'],
      rating: 4.6,
      reviews: 68,
    },
    {
      id: '24',
      name: 'Milan Concentrated Camphor Cleaner - 1L',
      price: 130,
      image: '/products/milan-concentrated-camphor-cleaner.png',
      category: 'Household Items',
      features: ['Rose fragrance', 'Concentrated formula', 'Long lasting', 'Premium quality'],
      rating: 4.8,
      reviews: 54,
    },
    {
      id: '23',
      name: 'Milan Comfit - 1L',
      price: 60,
      image: '/products/milan-comfit.png',
      category: 'Household Items',
      features: ['Comfort formula', 'Gentle on surfaces', 'Pleasant fragrance', 'Effective cleaning'],
      rating: 4.5,
      reviews: 83,
    },
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
    {
      id: '18',
      name: 'Milan Top Super Shine Liquid Soap - 5L',
      price: 150,
      originalPrice: 200,
      image: '/products/milan-top-liquid-soap5.png',
      category: 'Kitchen',
      features: ['Bulk size value pack', 'Super shine formula', 'Long lasting'],
      rating: 4.8,
      reviews: 89,
    },
  ]

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Check each filter category
      for (const [filterKey, filterValues] of Object.entries(filters)) {
        if (filterValues.length > 0) {
          switch (filterKey) {
            case 'category':
              if (!filterValues.includes(product.category)) {
                return false
              }
              break
            case 'price':
              // Handle price range filtering
              const price = product.price
              const priceInRange = filterValues.some(range => {
                switch (range) {
                  case 'under-50':
                    return price < 50
                  case '50-100':
                    return price >= 50 && price < 100
                  case '100-200':
                    return price >= 100 && price < 200
                  case 'over-200':
                    return price >= 200
                  default:
                    return false
                }
              })
              if (!priceInRange) return false
              break
            default:
              continue
          }
        }
      }
      return true
    })
  }, [filters])

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts]
    
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price)
      case 'price-high':
        return products.sort((a, b) => b.price - a.price)
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating)
      case 'newest':
        return products.sort((a, b) => parseInt(b.id) - parseInt(a.id))
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return products
    }
  }, [filteredProducts, sortBy])

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No products found</div>
        <p className="text-gray-400">Try adjusting your filters to see more products.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}

export default ProductsGrid