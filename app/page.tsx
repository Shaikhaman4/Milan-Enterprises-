import Hero from '@/components/home/Hero'
import ValueProposition from '@/components/home/ValueProposition'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <ValueProposition />
      <FeaturedProducts />
      <Newsletter />
    </div>
  )
}