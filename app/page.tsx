import FeaturedProducts from '@/components/FeaturedProducts';
import AboutPreview from '@/components/AboutPreview';
import CTASection from '@/components/CTASection';
import Hero from '@/components/Hero';
import InstagramFeed from '@/components/InstagramFeed';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutPreview />
      <FeaturedProducts />
      <InstagramFeed />
      <CTASection />
    </main>
  )
}