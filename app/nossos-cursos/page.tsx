import Link from 'next/link';
import Image from 'next/image';

export default function CursosPage() {
  const topicos = [
    'Pintura com acabamento limpo, evitando marcas de pincel',
    'Como pintar com contraste, utilizando o círculo cromático para luz e sombra',
    'Pintura de rosto e pele',
    'Preparação da peça para pintura, como aplicação de primer',
  ];

  return (
    <main className="min-h-screen bg-primary pt-28 pb-16 px-4">
      {/* ── Hero Banner ── */}
      <section className="max-w-4xl mx-auto text-center mb-14">
        <span
          className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-accentAlt mb-4 
                     bg-accentAlt/10 px-4 py-1.5 rounded-full border border-accentAlt/20"
        >
          Novidade
        </span>

        <h1 className="text-5xl md:text-6xl font-heading font-bold text-secondary mb-3">
          Em breve
        </h1>

        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-accent mb-2">
          Curso de pintura e acabamento
        </h2>
        <p className="text-gray-400 text-lg">presencial</p>
      </section>

      {/* ── Conteúdo Principal ── */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ── Coluna Esquerda — O que irei ensinar ── */}
        <div className="relative bg-gray-800/60 rounded-2xl p-8 md:p-10 border border-gray-700/60 
                        backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-500">
          {/* Detalhe decorativo */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl 
                          group-hover:bg-accent/10 transition-all duration-700" />

          <h3 className="relative text-2xl font-heading font-bold text-accentAlt mb-6 flex items-center gap-3">
            <span className="inline-block w-1.5 h-8 bg-accentAlt rounded-full" />
            O que irei ensinar?
          </h3>

          <ul className="relative space-y-4">
            {topicos.map((topico, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-secondary/90 leading-relaxed group/item"
              >
                <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-accent 
                               group-hover/item:scale-125 transition-transform duration-300" />
                <span>{topico}</span>
              </li>
            ))}
          </ul>

          {/* Tag de modalidade */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 
                           rounded-full bg-accent/15 text-accent border border-accent/20">
              🎨 Pintura
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 
                           rounded-full bg-accentAlt/15 text-accentAlt border border-accentAlt/20">
              📍 Presencial
            </span>
          </div>
        </div>

        {/* ── Coluna Direita — QR Code ── */}
        <div className="relative bg-gray-800/60 rounded-2xl p-8 md:p-10 border border-gray-700/60 
                        backdrop-blur-sm flex flex-col items-center justify-center text-center 
                        overflow-hidden group hover:border-accent/30 transition-all duration-500">
          {/* Detalhe decorativo */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accentAlt/5 rounded-full blur-3xl 
                          group-hover:bg-accentAlt/10 transition-all duration-700" />

          <p className="relative text-lg font-heading font-semibold text-secondary mb-6 max-w-xs leading-relaxed">
            Tem vontade de aprender a pintar figuras de forma profissional?
          </p>

          {/* QR Code Container */}
          <div className="relative bg-white rounded-2xl p-4 shadow-lg shadow-accent/10 
                          group-hover:shadow-accent/20 transition-shadow duration-500 mb-6">
            <Image
              src="/cursos/qrcode_pesquisa.jpeg"
              alt="QR Code — Responda nossa pesquisa sobre o curso de pintura"
              width={200}
              height={200}
              className="rounded-lg"
              priority
            />
          </div>

          <p className="relative text-secondary/80 text-sm leading-relaxed max-w-[16rem]">
            Nos ajude a tornar possível respondendo a nossa pesquisa{' '}
            <span className="text-accent">♥</span>
          </p>

          <p className="relative mt-3 text-[11px] text-gray-500 uppercase tracking-widest">
            Aponte a câmera para o QR Code
          </p>
        </div>
      </section>

      {/* ── Botão de volta ── */}
      <div className="max-w-5xl mx-auto mt-12 text-center">
        <Link
          href="/"
          className="btn-secondary inline-flex items-center gap-2 text-sm"
        >
          ← Voltar para Home
        </Link>
      </div>
    </main>
  );
}
