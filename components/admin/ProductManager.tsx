'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  features: string[]
  rating: number
  reviews: number
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([
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
      price: 25,
      image: '/products/milan-bleach-aala-liquid.png',
      category: 'Household Items',
      features: ['Superior quality', 'Effective bleaching', 'Multi-purpose use', 'Safe formula'],
      rating: 4.5,
      reviews: 87,
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
    }
  ])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: '',
    features: '',
    rating: '4.5',
    reviews: '0'
  })

  const categories = [
    'Floor Care',
    'Kitchen',
    'Bathroom',
    'Glass Care',
    'Household Items',
    'Laundry'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      image: formData.image || 'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: formData.category,
      features: formData.features.split(',').map(f => f.trim()),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews)
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p))
      setEditingProduct(null)
    } else {
      setProducts([...products, newProduct])
    }

    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      image: '',
      category: '',
      features: '',
      rating: '4.5',
      reviews: '0'
    })
    setIsAddingProduct(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      image: product.image,
      category: product.category,
      features: product.features.join(', '),
      rating: product.rating.toString(),
      reviews: product.reviews.toString()
    })
    setIsAddingProduct(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const exportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'products.json'
    link.click()
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Manager</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsAddingProduct(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Product</span>
          </button>
          <button
            onClick={exportProducts}
            className="btn-secondary"
          >
            Export Products
          </button>
        </div>
      </div>

      {/* Add/Edit Product Form */}
      {isAddingProduct && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features (comma separated) *
              </label>
              <input
                type="text"
                required
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Reviews
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingProduct(false)
                  setEditingProduct(null)
                  setFormData({
                    name: '',
                    price: '',
                    originalPrice: '',
                    image: '',
                    category: '',
                    features: '',
                    rating: '4.5',
                    reviews: '0'
                  })
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Products ({products.length})
          </h3>
        </div>

        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products added yet. Click "Add Product" to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.features.slice(0, 2).join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>₹{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.rating} ({product.reviews})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          How to Use Product Manager
        </h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Click "Add Product" to create new products</li>
          <li>• Use the edit icon to modify existing products</li>
          <li>• Use the delete icon to remove products</li>
          <li>• Click "Export Products" to download your product data as JSON</li>
          <li>• Copy the exported JSON data to your ProductsGrid.tsx file</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductManager