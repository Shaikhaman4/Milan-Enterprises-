'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CleanMeterProps {
  effectiveness: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const CleanMeter = ({ effectiveness, label = 'Cleaning Effectiveness', size = 'md' }: CleanMeterProps) => {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(effectiveness)
    }, 500)
    return () => clearTimeout(timer)
  }, [effectiveness])

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const getColor = (value: number) => {
    if (value >= 90) return 'from-green-400 to-green-600'
    if (value >= 70) return 'from-yellow-400 to-yellow-600'
    return 'from-red-400 to-red-600'
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`font-medium text-gray-700 ${textSizeClasses[size]}`}>
          {label}
        </span>
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
          {Math.round(animatedValue)}%
        </span>
      </div>
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${getColor(effectiveness)} relative`}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
      
      {effectiveness >= 95 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex items-center space-x-1 text-green-600"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Premium Clean</span>
        </motion.div>
      )}
    </div>
  )
}

export default CleanMeter