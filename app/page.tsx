import Hero from '@/components/Hero'
import AboutPreview from '@/components/AboutPreview'
import FeaturedProducts from '@/components/FeaturedProducts'
import InstagramFeed from '@/components/InstagramFeed'
import CTASection from '@/components/CTASection'


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="flex justify-center mt-6 mb-2">

      </div>
      <AboutPreview />
      <FeaturedProducts />
      <InstagramFeed />
      <CTASection />
    </main>
  )
}