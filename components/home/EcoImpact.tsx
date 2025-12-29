'use client'

import { motion } from 'framer-motion'
import { 
  GlobeAltIcon, 
  BeakerIcon, 
  ArrowPathIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline'

const EcoImpact = () => {
  const impacts = [
    {
      icon: GlobeAltIcon,
      title: 'Water Saved',
      value: '2.5M',
      unit: 'Liters',
      description: 'Through concentrated formulas and efficient cleaning',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: ArrowPathIcon,
      title: 'Plastic Reduced',
      value: '15K',
      unit: 'Bottles',
      description: 'With our refill program and eco-packaging',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: BeakerIcon,
      title: 'Chemical-Free',
      value: '95%',
      unit: 'Natural',
      description: 'Plant-based ingredients in our formulations',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: HeartIcon,
      title: 'Families Protected',
      value: '50K+',
      unit: 'Homes',
      description: 'Safe, non-toxic cleaning for peace of mind',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
            Our Environmental Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every CleanCare product you choose makes a positive difference for our planet. 
            Here's the impact we've made together.
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 text-center group hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-16 h-16 ${impact.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <impact.icon className={`w-8 h-8 ${impact.color}`} />
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  {impact.value}
                </div>
                <div className={`text-sm font-medium ${impact.color}`}>
                  {impact.unit}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {impact.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {impact.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 lg:p-12 text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join the Clean Revolution
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Switch to CleanCare and be part of a community that's making cleaning safer for families 
            and kinder to the environment. Every bottle makes a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Start Your Eco Journey
            </button>
            <button className="btn-secondary">
              Learn More About Sustainability
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EcoImpact