'use client'

import ProductManager from '@/components/admin/ProductManager'
import AdminGuard from '@/components/auth/AdminGuard'

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <ProductManager />
      </div>
    </AdminGuard>
  )
}