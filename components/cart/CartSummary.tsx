'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TagIcon, TruckIcon, ShieldCheckIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import WhatsAppOrderModal from './WhatsAppOrderModal'

const CartSummary = () => {
  const { items, getTotalPrice } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)

  const subtotal = getTotalPrice()
  const discount = appliedCoupon ? subtotal * 0.1 : 0 // 10% discount
  const total = subtotal - discount

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'clean10') {
      setAppliedCoupon(couponCode)
      setCouponCode('')
    } else {
      alert('Invalid coupon code')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <>
      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({items.length} items)</span>
              <span>₹{Math.round(subtotal)}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({appliedCoupon})</span>
                <span>-₹{Math.round(discount)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total Amount</span>
                <span>₹{Math.round(total)}</span>
              </div>
            </div>
          </div>

          {/* Order Buttons */}
          <div className="mt-6 space-y-3">
            {/* WhatsApp Order Button */}
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>Send Order to WhatsApp</span>
            </button>
            
            {/* Alternative Contact */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Or call us directly:</p>
              <a 
                href="tel:+919284992154"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                +91 92849 92154
              </a>
            </div>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <TagIcon className="w-5 h-5" />
            <span>Coupon Code</span>
          </h3>

          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 text-green-700">
                <TagIcon className="w-4 h-4" />
                <span className="font-medium">{appliedCoupon}</span>
                <span className="text-sm">applied</span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="input-field"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={!couponCode}
                className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply Coupon
              </button>
              <p className="text-xs text-gray-500">
                Try "CLEAN10" for 10% off your order
              </p>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">100% Safe & Natural Products</span>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-700">Direct WhatsApp support</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">Quality guaranteed products</span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        total={total}
      />
    </>
  )
}

export default CartSummary