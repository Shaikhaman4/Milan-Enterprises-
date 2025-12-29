import Hero from '@/components/about/Hero'
import Story from '@/components/about/Story'
import Values from '@/components/about/Values'
import Stats from '@/components/about/Stats'

export const metadata = {
  title: 'About Us - Milan Enterprises',
  description: 'Learn about Milan Enterprises\' commitment to providing premium quality cleaning solutions and household items that are safe, effective, and affordable.',
}

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <Hero />
      <Story />
      <Values />
      <Stats />
    </div>
  )
}