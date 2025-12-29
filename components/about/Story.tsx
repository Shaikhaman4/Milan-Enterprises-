'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const Story = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How a mother's concern for her family's health sparked a revolution in cleaning
          </p>
        </motion.div>

        {/* Story Content */}
        <div className="space-y-16">
          {/* Chapter 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                Chapter 1: The Problem
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                When Clean Wasn't Safe
              </h3>
              <p className="text-gray-600 leading-relaxed">
                It started in 2018 when Sarah Chen, a working mother of two, noticed her daughter's 
                persistent cough seemed to worsen after cleaning days. After researching the harsh 
                chemicals in conventional cleaners, she was shocked to discover the potential health 
                risks lurking in her cleaning cabinet.
              </p>
              <p className="text-gray-600 leading-relaxed">
                "I realized I was trying to create a clean, safe home for my family while unknowingly 
                exposing them to harmful toxins," Sarah recalls. "That's when I knew something had to change."
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-80 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Mother and child in a clean, safe home"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Chapter 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 rounded-2xl overflow-hidden lg:order-1"
            >
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Natural ingredients and laboratory research"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 lg:order-2"
            >
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Chapter 2: The Solution
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Back to Nature, Forward to Science
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sarah partnered with Dr. Michael Rodriguez, a biochemist specializing in green chemistry. 
                Together, they spent months in his lab, experimenting with plant-based ingredients that 
                could match or exceed the cleaning power of traditional chemicals.
              </p>
              <p className="text-gray-600 leading-relaxed">
                "We weren't just looking for 'natural' – we needed products that actually worked better 
                than what was already on the market," explains Dr. Rodriguez. "It took 47 formulations 
                before we got our first floor cleaner right."
              </p>
            </motion.div>
          </div>

          {/* Chapter 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Chapter 3: The Mission
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                From Kitchen to Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                What started as a solution for one family quickly grew into a mission to help thousands. 
                After friends and neighbors experienced the difference CleanCare products made in their 
                homes, word spread organically through communities.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, CleanCare serves over 50,000 families across the country, but our mission remains 
                the same: proving that you don't have to choose between a clean home and a healthy family.
              </p>
              
              {/* Mission Statement */}
              <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
                <p className="text-primary-800 font-medium italic">
                  "To create cleaning products so safe, you'd feel comfortable using them around 
                  your newborn, yet so effective, they outperform anything else on the market."
                </p>
                <div className="text-primary-600 text-sm mt-2">- CleanCare Mission Statement</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-80 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Happy families using CleanCare products"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story