'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import StarRating from './StarRating'

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
  variants?: {
    size: string
    price: number
    originalPrice?: number
  }[]
}

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0) // Index of selected variant
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const isWishlisted = isInWishlist(product.id)

  // Get current price based on selected variant
  const currentPrice = product.variants ? product.variants[selectedVariant].price : product.price
  const currentOriginalPrice = product.variants ? product.variants[selectedVariant].originalPrice : product.originalPrice

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)
    
    // Add item to cart with selected variant
    const itemName = product.variants 
      ? `${product.name} - ${product.variants[selectedVariant].size}`
      : product.name
    
    addItem({
      id: product.variants ? `${product.id}-${selectedVariant}` : product.id,
      name: itemName,
      price: currentPrice,
      image: product.image,
    })
    
    // Show feedback for 1 second
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image,
        inStock: true,
        rating: product.rating,
        reviews: product.reviews,
        description: product.features.join(', ')
      })
    }
  }

  const discountPercentage = currentOriginalPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden group h-full flex flex-col cursor-default"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
          unoptimized={true}
          onError={(e) => {
            console.error('Image failed to load:', product.image, e);
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer"
          suppressHydrationWarning={true}
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-4 h-4 text-red-500" />
          ) : (
            <HeartIcon className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        {/* Category */}
        <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <StarRating 
          rating={product.rating} 
          reviews={product.reviews}
          size="md"
        />

        {/* Features */}
        <div className="space-y-1 flex-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
              <span className="text-xs text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* Size Selection (if variants exist) */}
        {product.variants && (
          <div className="mb-3">
            <div className="flex gap-2">
              {product.variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(index)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedVariant === index
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{currentPrice}
            </span>
            {currentOriginalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{currentOriginalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 mt-3 cursor-pointer ${
            isAddingToCart 
              ? 'bg-green-600 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
          suppressHydrationWarning={true}
        >
          {isAddingToCart ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingCartIcon className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard