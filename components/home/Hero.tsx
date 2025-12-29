'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-clean-mint via-clean-aqua to-clean-blue min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight text-center lg:text-left"
              >
                Premium Clean.
                <br />
                <span className="text-primary-600">Trusted Care.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-700 max-w-lg text-center lg:text-left mx-auto lg:mx-0"
              >
                High-quality, effective, affordable, and eco-friendly cleaning solutions from Milan Enterprises for homes, offices, and eco-conscious consumers.
              </motion.p>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <span className="eco-badge text-sm">Dermatologically Safe</span>
              <span className="eco-badge text-sm">Premium Quality</span>
              <span className="eco-badge text-sm">Trusted Brand</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products" className="btn-primary text-center">
                Clean Smarter Today
              </Link>
              <Link href="/sustainability" className="btn-secondary text-center">
                Our Eco Impact
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image - Milan Enterprises Logo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md h-96 lg:h-[500px] bg-white rounded-3xl shadow-2xl p-8 border-4 border-primary-100 flex items-center justify-center">
              <Image
                src="/milan-log.png"
                alt="Milan Enterprises - Premium Cleaning Solutions"
                fill
                className="object-contain p-8"
                priority
              />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">99.9%</div>
                  <div className="text-xs text-gray-600">Germ Kill</div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-xs text-gray-600">Natural</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-200/30 rounded-full blur-xl"></div>
    </section>
  )
}

export default Hero