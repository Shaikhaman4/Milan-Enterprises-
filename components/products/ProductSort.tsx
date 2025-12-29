'use client'

interface ProductSortProps {
  sortBy: string
  onSortChange: (sortBy: string) => void
}

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const ProductSort = ({ sortBy, onSortChange }: ProductSortProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'name-az', label: 'Name: A to Z' },
    { id: 'name-za', label: 'Name: Z to A' },
    { id: 'rating', label: 'Customer Rating' },
    { id: 'newest', label: 'Newest First' },
  ]

  const selectedOption = sortOptions.find(option => option.id === sortBy)

  const handleSortChange = (newSortBy: string) => {
    onSortChange(newSortBy)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">
          Sort by: {selectedOption?.label}
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    sortBy === option.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductSort