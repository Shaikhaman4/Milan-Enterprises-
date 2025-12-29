'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    {
      number: 50000,
      suffix: '+',
      label: 'Happy Families',
      description: 'Trust CleanCare for their daily cleaning needs',
    },
    {
      number: 2.5,
      suffix: 'M',
      label: 'Liters Water Saved',
      description: 'Through our concentrated formulas',
    },
    {
      number: 15000,
      suffix: '+',
      label: 'Plastic Bottles Prevented',
      description: 'From entering landfills via our refill program',
    },
    {
      number: 99.9,
      suffix: '%',
      label: 'Germ Elimination',
      description: 'Proven effectiveness in laboratory tests',
    },
    {
      number: 95,
      suffix: '%',
      label: 'Natural Ingredients',
      description: 'Plant-based formulations in our products',
    },
    {
      number: 4.8,
      suffix: '★',
      label: 'Customer Rating',
      description: 'Average rating across all our products',
    },
  ]

  const AnimatedNumber = ({ number, suffix }: { number: number; suffix: string }) => {
    const [displayNumber, setDisplayNumber] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = number / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= number) {
          setDisplayNumber(number)
          clearInterval(timer)
        } else {
          setDisplayNumber(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [isVisible, number])

    return (
      <span>
        {suffix === 'M' ? (displayNumber / 1000000).toFixed(1) : displayNumber.toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Real results from real families who've made the switch to CleanCare
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedNumber number={stat.number} suffix={stat.suffix} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-primary-100 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-primary-100 text-lg mb-6">
            Join thousands of families who've already made the switch
          </p>
          <button className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors">
            Start Your Clean Journey
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats