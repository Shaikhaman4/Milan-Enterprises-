'use client'

import { useState } from 'react'
import ProductsGrid from '@/components/products/ProductsGrid'
import ProductFilters from '@/components/products/ProductFilters'
import ProductSort from '@/components/products/ProductSort'
import { Metadata } from 'next'

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState('featured')
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({})

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our complete range of effective cleaning solutions and household items
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters 
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing products from Milan Enterprises
              </p>
              <ProductSort 
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Products Grid */}
            <ProductsGrid 
              sortBy={sortBy}
              filters={selectedFilters}
            />
          </div>
        </div>
      </div>
    </div>
  )
}