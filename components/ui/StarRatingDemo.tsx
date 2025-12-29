import StarRating from './StarRating'

const StarRatingDemo = () => {
  const examples = [
    { rating: 5.0, label: 'Perfect Rating' },
    { rating: 4.8, label: 'Excellent (80% of 5th star)' },
    { rating: 4.5, label: 'Great (50% of 5th star)' },
    { rating: 4.2, label: 'Good (20% of 5th star)' },
    { rating: 3.7, label: 'Average (70% of 4th star)' },
    { rating: 2.3, label: 'Below Average (30% of 3rd star)' },
  ]

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Star Rating Examples</h3>
      <div className="space-y-3">
        {examples.map((example, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-48">{example.label}</span>
            <StarRating rating={example.rating} reviews={Math.floor(Math.random() * 200) + 10} />
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium mb-2">Different Sizes:</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <span className="text-sm w-16">Small:</span>
            <StarRating rating={4.8} size="sm" reviews={156} />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm w-16">Medium:</span>
            <StarRating rating={4.8} size="md" reviews={156} />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm w-16">Large:</span>
            <StarRating rating={4.8} size="lg" reviews={156} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StarRatingDemo