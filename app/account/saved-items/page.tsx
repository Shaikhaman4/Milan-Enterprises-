'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

export default function SavedItemsPage() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [addingAllToCart, setAddingAllToCart] = useState(false)
  const [removingItems, setRemovingItems] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { addItem: addToCartStore } = useCartStore()
  const { items, removeItem, clearWishlist } = useWishlistStore()

  // Just set loaded state, don't auto-populate
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleRemoveItem = (id: string) => {
    setRemovingItems(prev => [...prev, id])
    setTimeout(() => {
      removeItem(id)
      setRemovingItems(prev => prev.filter(itemId => itemId !== id))
    }, 300)
  }

  const handleClearAll = () => {
    const allIds = items.map(item => item.id)
    setRemovingItems(allIds)
    setTimeout(() => {
      clearWishlist()
      setRemovingItems([])
    }, 300)
  }

  const showSuccessToast = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const addToCart = (item: typeof items[0]) => {
    setAddingToCart(item.id)
    addToCartStore({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    showSuccessToast(`${item.name} added to cart and removed from wishlist!`)
    
    // Remove item from wishlist after adding to cart
    setTimeout(() => {
      handleRemoveItem(item.id)
      setAddingToCart(null)
    }, 1000)
  }

  const addAllToCart = () => {
    setAddingAllToCart(true)
    const itemsToAdd = [...items] // Create a copy to avoid state mutation issues
    
    itemsToAdd.forEach(item => {
      addToCartStore({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    })
    
    showSuccessToast(`Added ${itemsToAdd.length} items to cart and cleared wishlist!`)
    
    // Clear all items from wishlist after adding to cart with animation
    setTimeout(() => {
      const allIds = items.map(item => item.id)
      setRemovingItems(allIds)
      setTimeout(() => {
        clearWishlist()
        setRemovingItems([])
        setAddingAllToCart(false)
      }, 300)
    }, 1000)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading wishlist...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            ← Back to Account
          </Link>
          
          <div className="flex items-center space-x-3">
            <span className="text-2xl">❤️</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                My Wishlist
              </h1>
              <p className="text-xl text-gray-600">
                {items.length} items saved for later
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💔</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products you love to your wishlist by clicking the heart icon on any product.
            </p>
            <div className="space-y-4">
              <Link
                href="/products"
                className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors mr-4"
              >
                Browse Products
              </Link>
              <Link
                href="/cart"
                className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
              <button 
                onClick={addAllToCart}
                disabled={addingAllToCart || items.length === 0}
                className={`font-medium transition-colors ${
                  addingAllToCart 
                    ? 'text-green-600' 
                    : items.length === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-primary-600 hover:text-primary-700'
                }`}
              >
                {addingAllToCart ? '✅ Added to cart!' : 'Add all to cart'}
              </button>
              <button 
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                    removingItems.includes(item.id) ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                      {item.originalPrice > item.price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                          <span className="text-sm text-green-600 font-medium">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <button 
                        onClick={() => addToCart(item)}
                        disabled={addingToCart === item.id}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          addingToCart === item.id
                            ? 'bg-green-600 text-white'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {addingToCart === item.id ? '✅ Added!' : '🛒 Add to Cart'}
                      </button>
                      
                      <Link
                        href={`/products/${item.id}`}
                        className="w-full block text-center py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-8">
          <Link
            href="/products"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Continue Shopping →
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/919284992154"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <span className="text-xl">📱</span>
              <span className="font-medium text-gray-900">WhatsApp Support</span>
            </a>
            
            <a
              href="mailto:milanentprises75@gmail.com"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <span className="text-xl">📧</span>
              <span className="font-medium text-gray-900">Email Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center space-x-2">
            <span className="text-lg">✅</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}