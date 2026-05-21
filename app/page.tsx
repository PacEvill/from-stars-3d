import FeaturedProducts from '@/components/FeaturedProducts';
import CTASection from '@/components/CTASection';
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const novidades = [
    { id: 'frieren', name: 'Figure Frieren Premium', price: 'R$ 250,00', image: '/frieren/Frieren_01.png' },
    { id: 'mercy', name: 'Estátua Mercy', price: 'R$ 350,00', image: '/mercy/mercy_01.png' },
    { id: 'going-merry', name: 'Going Merry Chibi', price: 'R$ 180,00', image: '/going-merry/going_merry_01.png' }
  ];

  const carouselImages = [
    '/this-is-fine/this_is_fine_01.png',
    '/roxy-migurdia/roxy_migurdia_01.png',
    '/frieren/Frieren_02.png',
    '/mercy/mercy_02.png',
    '/going-merry/going_merry_02.png'
  ];

  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Carrossel de Impressões 3D Decorativas */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 mb-10">
            Destaques em 3D
          </h2>
          <div className="flex overflow-x-auto space-x-6 pb-8 pt-4 scrollbar-hide snap-x px-4">
             {carouselImages.map((src, index) => (
                <div key={index} className="flex-none w-72 h-80 bg-gray-800 rounded-2xl overflow-hidden relative shadow-[0_0_25px_rgba(168,85,247,0.15)] snap-center hover:scale-105 transition-transform duration-500 cursor-pointer border border-gray-700/50">
                  <Image src={src} alt={`Destaque ${index}`} fill className="object-cover hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"></div>
                </div>
             ))}
          </div>
          <p className="mt-8 text-gray-400 text-lg">
            Inspire-se. Se você puder imaginar, podemos imprimir! <br/>
            Veja mais modelos fantásticos no <a href="https://cults3d.com/pt/impressao-3d" target="_blank" rel="noreferrer" className="text-accent hover:text-purple-400 font-semibold underline underline-offset-4 transition-colors">Cults3D</a>
          </p>
        </div>
      </section>

      {/* Novidades recentes */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-heading font-bold text-secondary mb-12">Novidades <span className="text-accent">Recentes</span></h2>
          <div className="grid md:grid-cols-3 gap-10">
            {novidades.map(item => (
              <div key={item.id} className="group bg-gray-800/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-700 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-accent/20">
                <div className="w-full h-56 bg-gray-900 rounded-xl mb-6 relative overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-accent text-xl font-semibold mb-4">{item.price}</p>
                <div className="w-12 h-1 bg-gradient-to-r from-accent to-transparent mx-auto rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link href="/contato" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent to-purple-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform hover:-translate-y-1 transition-all duration-300">
              Fale Conosco / Orçamentos Rápidos
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}