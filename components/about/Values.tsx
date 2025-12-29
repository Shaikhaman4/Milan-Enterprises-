'use client'

import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  GlobeAltIcon, 
  BeakerIcon, 
  UsersIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const Values = () => {
  const values = [
    {
      icon: HeartIcon,
      title: 'Family First',
      description: 'Every product is tested in our own homes with our own families before it reaches yours.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: GlobeAltIcon,
      title: 'Planet Conscious',
      description: 'Biodegradable formulas and sustainable packaging that protect our environment.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: BeakerIcon,
      title: 'Science-Backed',
      description: 'Rigorous testing and research ensure our products deliver superior cleaning power.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Transparency',
      description: 'Full ingredient disclosure and honest communication about what goes into our products.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: UsersIcon,
      title: 'Community Driven',
      description: 'We listen to our customers and continuously improve based on real feedback.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: SparklesIcon,
      title: 'Excellence',
      description: 'We never compromise on quality, effectiveness, or safety in pursuit of our mission.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
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
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide every decision we make and every product we create
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 text-center group hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <value.icon className={`w-8 h-8 ${value.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values