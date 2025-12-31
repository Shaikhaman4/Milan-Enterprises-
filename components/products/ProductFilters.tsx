'use client'

interface ProductFiltersProps {
  selectedFilters: {[key: string]: string[]}
  onFilterChange: (filters: {[key: string]: string[]}) => void
}

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const ProductFilters = ({ selectedFilters, onFilterChange }: ProductFiltersProps) => {
  const [openSections, setOpenSections] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setOpenSections(['category', 'price'])
  }, [])

  // Milan products - same as ProductsGrid
  const allProducts = [
    {
      id: '27',
      name: 'Milan White Lemon Grass Cleaner - 1L',
      price: 50,
      category: 'Household Items',
    },
    {
      id: '26',
      name: 'Milan Rexipic Toilet Cleaner - 500ml',
      price: 40,
      category: 'Bathroom',
    },
    {
      id: '25',
      name: 'Milan Milon Glass Cleaner',
      price: 40,
      category: 'Glass Care',
    },
    {
      id: '24',
      name: 'Milan Concentrated Camphor Cleaner - 1L',
      price: 130,
      category: 'Household Items',
    },
    {
      id: '23',
      name: 'Milan Comfit - 1L',
      price: 60,
      category: 'Household Items',
    },
    {
      id: '22',
      name: 'Milan Washing Powder - 1KG',
      price: 35,
      category: 'Laundry',
    },
    {
      id: '21',
      name: 'Milan Bleach Aala Liquid',
      price: 25,
      category: 'Household Items',
    },
    {
      id: '20',
      name: 'Milan Dhamaka Liquid Detergent All Purpose - 1L',
      price: 50,
      category: 'Household Items',
    },
    {
      id: '19',
      name: 'Milan Top Floor Cleaner - 1L',
      price: 60,
      category: 'Floor Care',
    },
    {
      id: '17',
      name: 'Milan Top Super Shine Liquid Soap - 1L',
      price: 40,
      category: 'Kitchen',
    },
    {
      id: '18',
      name: 'Milan Top Super Shine Liquid Soap - 5L',
      price: 150,
      category: 'Kitchen',
    },
  ]

  // Calculate dynamic counts
  const filterSections = useMemo(() => {
    // Count products by category
    const categoryCounts: {[key: string]: number} = {}
    allProducts.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1
    })

    // Count products by price range
    const priceCounts = {
      'under-50': 0,
      '50-100': 0,
      '100-200': 0,
      'over-200': 0,
    }

    allProducts.forEach(product => {
      if (product.price < 50) priceCounts['under-50']++
      else if (product.price >= 50 && product.price < 100) priceCounts['50-100']++
      else if (product.price >= 100 && product.price < 200) priceCounts['100-200']++
      else priceCounts['over-200']++
    })

    return [
      {
        id: 'category',
        title: 'Category',
        options: [
          { id: 'Floor Care', label: 'Floor Care', count: categoryCounts['Floor Care'] || 0 },
          { id: 'Kitchen', label: 'Kitchen', count: categoryCounts['Kitchen'] || 0 },
          { id: 'Household Items', label: 'Household Items', count: categoryCounts['Household Items'] || 0 },
          { id: 'Laundry', label: 'Laundry', count: categoryCounts['Laundry'] || 0 },
        ].filter(option => option.count > 0) // Only show categories with products
      },
      {
        id: 'price',
        title: 'Price Range',
        options: [
          { id: 'under-50', label: 'Under ₹50', count: priceCounts['under-50'] },
          { id: '50-100', label: '₹50 - ₹100', count: priceCounts['50-100'] },
          { id: '100-200', label: '₹100 - ₹200', count: priceCounts['100-200'] },
          { id: 'over-200', label: 'Over ₹200', count: priceCounts['over-200'] },
        ].filter(option => option.count > 0) // Only show price ranges with products
      },
    ]
  }, [])

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const handleFilterToggle = (sectionId: string, optionId: string) => {
    const currentFilters = selectedFilters[sectionId] || []
    const newFilters = currentFilters.includes(optionId)
      ? currentFilters.filter(id => id !== optionId)
      : [...currentFilters, optionId]
    
    onFilterChange({
      ...selectedFilters,
      [sectionId]: newFilters
    })
  }

  const clearAllFilters = () => {
    onFilterChange({})
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button 
          onClick={clearAllFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {filterSections.map((section) => (
          <div key={section.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-medium text-gray-900">{section.title}</h4>
              {openSections.includes(section.id) ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {isClient && openSections.includes(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 space-y-3"
                >
                  {section.options.map((option) => (
                    <label key={option.id} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={(selectedFilters[section.id] || []).includes(option.id)}
                        onChange={() => handleFilterToggle(section.id, option.id)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Price Range Slider */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="font-medium text-gray-900 mb-4">Custom Price Range</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Min"
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters