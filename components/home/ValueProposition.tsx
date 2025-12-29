'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  CurrencyDollarIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline'

const ValueProposition = () => {
  const values = [
    {
      icon: SparklesIcon,
      title: 'High Quality',
      description: 'Premium formulations that deliver exceptional cleaning power for all your household needs.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Effective & Safe',
      description: 'Dermatologically tested products that are tough on dirt but gentle on your family and pets.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Affordable',
      description: 'Premium quality at competitive prices, making clean living accessible to everyone.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

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
            Why Choose Milan Enterprises?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine the best of science and nature to create cleaning solutions that work harder, 
            so you don't have to.
          </p>
        </motion.div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card p-8 text-center group cursor-pointer"
            >
              <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <value.icon className={`w-8 h-8 ${value.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-700 font-medium">Germ Elimination</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-700 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Satisfaction Guarantee</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProposition