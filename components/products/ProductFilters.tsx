'use client'

interface ProductFiltersProps {
  selectedFilters: {[key: string]: string[]}
  onFilterChange: (filters: {[key: string]: string[]}) => void
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const ProductFilters = ({ selectedFilters, onFilterChange }: ProductFiltersProps) => {
  const [openSections, setOpenSections] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setOpenSections(['category', 'price'])
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

  const filterSections = [
    {
      id: 'category',
      title: 'Category',
      options: [
        { id: 'floor-care', label: 'Floor Care', count: 8 },
        { id: 'kitchen', label: 'Kitchen', count: 12 },
        { id: 'bathroom', label: 'Bathroom', count: 6 },
        { id: 'laundry', label: 'Laundry', count: 5 },
        { id: 'glass-care', label: 'Glass Care', count: 4 },
        { id: 'multi-surface', label: 'Multi-Surface', count: 7 },
        { id: 'refills', label: 'Premium Refills', count: 6 },
        { id: 'household-items', label: 'Household Items', count: 8 },
        { id: 'kitchen-essentials', label: 'Kitchen Essentials', count: 6 },
      ]
    },
    {
      id: 'price',
      title: 'Price Range',
      options: [
        { id: 'under-200', label: 'Under ₹200', count: 15 },
        { id: '200-400', label: '₹200 - ₹400', count: 25 },
        { id: '400-600', label: '₹400 - ₹600', count: 8 },
        { id: 'over-600', label: 'Over ₹600', count: 3 },
      ]
    },
  ]

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