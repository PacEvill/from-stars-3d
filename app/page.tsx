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
      
      {/* Como Funciona */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 mb-12">
            Como Funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Linha conectora (apenas em telas grandes) */}
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-1 bg-gradient-to-r from-accent to-purple-600 transform -translate-y-1/2 z-0 opacity-50"></div>
            
            {/* Passo 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-900 rounded-full border-4 border-accent flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-3">Envie sua Ideia</h3>
              <p className="text-gray-400">Compartilhe uma referência, modelo ou simplesmente a sua imaginação pelos nossos canais de contato.</p>
            </div>
            
            {/* Passo 2 */}
            <div className="relative z-10 flex flex-col items-center mt-8 md:mt-0">
              <div className="w-20 h-20 bg-gray-900 rounded-full border-4 border-purple-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-3">Modelagem & Setup</h3>
              <p className="text-gray-400">Nossa equipe ajusta os modelos 3D, escolhe os melhores materiais e valida o design com você.</p>
            </div>
            
            {/* Passo 3 */}
            <div className="relative z-10 flex flex-col items-center mt-8 md:mt-0">
              <div className="w-20 h-20 bg-gray-900 rounded-full border-4 border-accentAlt flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-3">Impressão & Entrega</h3>
              <p className="text-gray-400">A mágica acontece! Sua peça é impressa em alta resolução, finalizada à mão e enviada até você.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos / Por que escolher */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold text-secondary mb-12">Por que escolher a <span className="text-accent">Star3D</span>?</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-accent transition-colors shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl tracking-widest">★★★★★</div>
              </div>
              <p className="text-gray-300 mb-6 font-medium italic">&quot;A qualidade da pintura manual da minha figure de RPG ficou absurda. Cada detalhe da armadura foi feito com um carinho que eu nunca vi em peças industriais.&quot;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">L</div>
                <div>
                  <h4 className="text-white font-bold">Lucas M.</h4>
                  <p className="text-sm text-gray-500">Mestre de RPG</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl tracking-widest">★★★★★</div>
              </div>
              <p className="text-gray-300 mb-6 font-medium italic">&quot;Encomendei letreiros personalizados para a minha loja e o resultado foi entregue super rápido. O material usado tem uma textura fantástica!&quot;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">R</div>
                <div>
                  <h4 className="text-white font-bold">Roberta V.</h4>
                  <p className="text-sm text-gray-500">Empreendedora</p>
                </div>
              </div>
            </div>
          </div>
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