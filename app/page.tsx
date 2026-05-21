import FeaturedProducts from '@/components/FeaturedProducts';
import CTASection from '@/components/CTASection';
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const carouselImages = [
    '/this-is-fine/this_is_fine_01.png',
    '/roxy-migurdia/roxy_migurdia_01.png',
    '/frieren/Frieren_02.png',
    '/mercy/mercy_02.png',
    '/going-merry/going_merry_02.png'
  ];

  return (
    <main className="min-h-screen bg-primary">
      <Hero />
      
      {/* Carrossel de Impressões 3D Decorativas */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 shadow-inner relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400 mb-6">
            Destaques em 3D
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Deslize para ver os nossos projetos mais recentes, modelados e impressos com a mais alta qualidade em resina e filamento.
          </p>

          <div className="flex overflow-x-auto space-x-6 pb-8 pt-4 scrollbar-hide snap-x px-4">
             {carouselImages.map((src, index) => (
                <div key={index} className="flex-none w-72 h-96 bg-gray-800 rounded-3xl overflow-hidden relative shadow-[0_0_30px_rgba(168,85,247,0.15)] snap-center hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-gray-700/50 group">
                  <Image src={src} alt={`Destaque ${index}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
             ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/catalogo" className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent to-purple-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform hover:-translate-y-1 transition-all duration-300">
              Ver Catálogo Completo
            </Link>
            <p className="text-gray-400 text-lg">
              Ou busque inspirações no <a href="https://cults3d.com/pt/impressao-3d" target="_blank" rel="noreferrer" className="text-accent hover:text-purple-400 font-semibold underline underline-offset-4 transition-colors">Cults3D</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}