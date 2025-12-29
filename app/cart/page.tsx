import CartItems from '@/components/cart/CartItems'
import CartSummary from '@/components/cart/CartSummary'
import RelatedProducts from '@/components/cart/RelatedProducts'

export const metadata = {
  title: 'Shopping Cart - CleanCare',
  description: 'Review your selected cleaning products and proceed to checkout.',
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout when ready
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts />
        </div>
      </div>
    </div>
  )
}