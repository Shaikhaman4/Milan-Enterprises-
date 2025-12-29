'use client'

import { motion } from 'framer-motion'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

interface EcoScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
}

const EcoScoreBadge = ({ score, size = 'md', showDetails = false }: EcoScoreBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-orange-600 bg-orange-50 border-orange-200'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 70) return 'Good'
    return 'Fair'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className="space-y-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`inline-flex items-center space-x-1.5 rounded-full border font-medium ${getScoreColor(score)} ${sizeClasses[size]}`}
      >
        <GlobeAltIcon className={iconSizes[size]} />
        <span>Eco Score: {score}</span>
      </motion.div>
      
      {showDetails && (
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Environmental Impact:</span>
            <span className="font-medium">{getScoreLabel(score)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-1.5 rounded-full ${
                score >= 90 ? 'bg-green-500' : 
                score >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
              }`}
            />
          </div>
          <div className="text-xs text-gray-500">
            Based on biodegradability, packaging, and carbon footprint
          </div>
        </div>
      )}
    </div>
  )
}

export default EcoScoreBadge