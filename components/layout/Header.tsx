'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuth } from '@/contexts/AuthContext'
import SearchBar from '@/components/ui/SearchBar'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { user, logout, isAdmin } = useAuth()
  const { items } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)
  const wishlistItemsCount = wishlistItems.length

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close mobile menu when clicking outside or on overlay
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/favicon.ico"
                alt="Milan Enterprises Logo"
                fill
                className="object-contain"
                priority
                key="favicon-logo"
              />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">Milan Enterprises</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Hidden on mobile only */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:block p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* User Account / Login - Hidden on mobile only */}
            {user ? (
              <div className="hidden md:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-1"
                  aria-label="Account"
                  title={`Welcome, ${user.firstName || 'User'}`}
                >
                  <UserIcon className="w-5 h-5" />
                  {isAdmin && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-1 rounded">Admin</span>
                  )}
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Account
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Cog6ToothIcon className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                aria-label="Login"
                title="Sign in to your account"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}

            {/* Wishlist - Hidden on mobile only */}
            <Link
              href="/account/saved-items"
              className="hidden md:block relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              aria-label="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {wishlistItemsCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button - Only visible on mobile phones */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden mobile-menu-button p-3 text-gray-700 hover:text-primary-600 transition-colors duration-200 border border-gray-300 rounded-md"
              aria-label="Menu"
              style={{ 
                minWidth: '44px',
                minHeight: '44px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: 'white',
                border: '1px solid #d1d5db'
              }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Animated Backdrop */}
          <div 
            className="fixed inset-0 bg-black z-[999] md:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              zIndex: 999,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              animation: 'fadeIn 0.3s ease-out'
            }}
          />
          
          {/* Animated Mobile Menu Panel */}
          <div 
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-[1000] md:hidden overflow-y-auto animate-slide-in"
            style={{ 
              position: 'fixed', 
              top: 0, 
              right: 0, 
              height: '100vh', 
              width: '320px', 
              maxWidth: '85vw', 
              backgroundColor: 'white', 
              zIndex: 1000,
              boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.1), -10px 0 10px -5px rgba(0, 0, 0, 0.04)',
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            {/* Menu Header with Animation */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ padding: '8px', fontSize: '16px' }}
              >
                <span className="inline-block transform transition-transform duration-200 hover:rotate-90">✕</span>
              </button>
            </div>

            {/* User Info Section with Animation */}
            {user && (
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110">
                    <span className="text-white font-bold text-lg">{user.firstName?.[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full mt-1 animate-pulse">
                        ✨ Admin
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links with Staggered Animation */}
            <div className="py-2">
              {/* Main Navigation */}
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-b border-gray-100 transition-all duration-300 hover:translate-x-2 hover:text-blue-600 animate-fade-in-up"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    display: 'block', 
                    padding: '16px', 
                    textDecoration: 'none', 
                    color: '#374151',
                    animationDelay: `${0.1 + index * 0.05}s`
                  }}
                >
                  <span className="font-medium flex items-center">
                    <span className="mr-3 text-lg">
                      {item.name === 'Home' && '🏠'}
                      {item.name === 'Products' && '🧽'}
                      {item.name === 'About' && 'ℹ️'}
                      {item.name === 'Sustainability' && '🌱'}
                      {item.name === 'Contact' && '📞'}
                    </span>
                    {item.name}
                  </span>
                </a>
              ))}

              {/* Animated Divider */}
              <div className="border-t border-gray-300 my-2 mx-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              {/* User-specific Links with Enhanced Animation */}
              {user ? (
                <>
                  <a
                    href="/account"
                    className="block px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 hover:translate-x-2 hover:text-green-600 animate-fade-in-up"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                      display: 'block', 
                      padding: '16px', 
                      textDecoration: 'none', 
                      color: '#374151',
                      animationDelay: '0.5s'
                    }}
                  >
                    <span className="font-medium flex items-center">
                      <span className="mr-3 text-lg">👤</span>
                      My Account
                    </span>
                  </a>
                  
                  <a
                    href="/account/saved-items"
                    className="block px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all duration-300 hover:translate-x-2 hover:text-pink-600 animate-fade-in-up"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                      display: 'block', 
                      padding: '16px', 
                      textDecoration: 'none', 
                      color: '#374151',
                      animationDelay: '0.6s'
                    }}
                  >
                    <span className="font-medium flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="mr-3 text-lg animate-pulse">❤️</span>
                        Wishlist
                      </span>
                      {wishlistItemsCount > 0 && (
                        <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full px-2 py-1 animate-bounce">
                          {wishlistItemsCount}
                        </span>
                      )}
                    </span>
                  </a>

                  <a
                    href="/cart"
                    className="block px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:translate-x-2 hover:text-blue-600 animate-fade-in-up"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                      display: 'block', 
                      padding: '16px', 
                      textDecoration: 'none', 
                      color: '#374151',
                      animationDelay: '0.7s'
                    }}
                  >
                    <span className="font-medium flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="mr-3 text-lg">🛒</span>
                        Cart
                      </span>
                      {cartItemsCount > 0 && (
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-full px-2 py-1 animate-bounce">
                          {cartItemsCount}
                        </span>
                      )}
                    </span>
                  </a>
                  
                  {isAdmin && (
                    <a
                      href="/admin"
                      className="block px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 hover:translate-x-2 hover:text-purple-600 animate-fade-in-up"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ 
                        display: 'block', 
                        padding: '16px', 
                        textDecoration: 'none', 
                        color: '#374151',
                        animationDelay: '0.8s'
                      }}
                    >
                      <span className="font-medium flex items-center">
                        <span className="mr-3 text-lg animate-spin" style={{ animationDuration: '3s' }}>⚙️</span>
                        Admin Panel
                      </span>
                    </a>
                  )}
                  
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-4 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 hover:translate-x-2 animate-fade-in-up"
                      style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '16px', 
                        textAlign: 'left', 
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        color: '#dc2626',
                        animationDelay: '0.9s'
                      }}
                    >
                      <span className="font-medium flex items-center">
                        <span className="mr-3 text-lg">🚪</span>
                        Sign Out
                      </span>
                    </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="block px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 hover:translate-x-2 hover:text-green-600 animate-fade-in-up"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    display: 'block', 
                    padding: '16px', 
                    textDecoration: 'none', 
                    color: '#374151',
                    animationDelay: '0.5s'
                  }}
                >
                  <span className="font-medium flex items-center">
                    <span className="mr-3 text-lg">🔑</span>
                    Sign In
                  </span>
                </a>
              )}
            </div>
          </div>
        </>
      )}

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}

export default Header