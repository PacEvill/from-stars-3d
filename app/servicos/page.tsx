import { motion } from 'framer-motion'
import { Shapes, Palette, Paintbrush, Layers, Sparkles, ShieldCheck, LifeBuoy, Clock, Printer } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Shapes,
    title: 'Modelagem & Escultura Digital',
    description: 'Desenvolvemos personagens, props e miniaturas exclusivas a partir de ideias, referências ou arquivos base.',
    highlights: [
      'Criação do zero ou adaptação de modelos existentes',
      'Refino de topologia para impressão sem falhas',
      'Ajustes de pose, acessórios e expressões',
    ],
  },
  {
    icon: Layers,
    title: 'Pré-impressão & Engenharia',
    description: 'Preparamos seus arquivos com suportes estratégicos para melhor qualidade e economia de material.',
    highlights: [
      'Configuração otimizada para resina (SLA/DLP) e filamento (FDM)',
      'Fatiamento com perfis calibrados',
      'Testes de encaixe e tolerâncias dimensionais',
    ],
  },
  {
    icon: Printer,
    title: 'Impressão 3D Profissional',
    description: 'Equipamentos de alta precisão, qualidade consistente e prazos claros em cada etapa do processo.',
    highlights: [
      'Impressão em resina para detalhes de colecionáveis',
      'Impressão em filamento para peças funcionais',
      'Painel de acompanhamento com fotos do andamento',
    ],
  },
  {
    icon: Paintbrush,
    title: 'Pintura & Pós-Processo',
    description: 'Finalização artesanal com pintura, efeitos especiais e montagem completos.',
    highlights: [
      'Lixamento, preenchimento e acabamento premium',
      'Paletas personalizadas com consulta prévia',
      'Efeitos especiais: luz, transparência, weathering',
    ],
  },
  {
    icon: Palette,
    title: 'Direção de Arte & Criatividade',
    description: 'Ajudamos a transformar a essência do personagem em uma peça única para a sua coleção.',
    highlights: [
      'Brainstorm de cenário, base e storytelling',
      'Moodboard e pré-visualização de cores',
      'Consultoria para coleções completas ou séries limitadas',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Garantia & Suporte',
    description: 'Transparência total com canais dedicados para você acompanhar tudo e tirar dúvidas.',
    highlights: [
      'Checklist de qualidade antes do envio',
      'Reparo ou reimpressão em casos cobertos pela garantia',
      'Suporte via WhatsApp e e-mail com SLA definido',
    ],
  },
]

const workflow = [
  {
    icon: Sparkles,
    title: 'Briefing & Cocriação',
    text: 'Reunião inicial para entender a sua ideia, referências e metas de prazo e orçamento.',
  },
  {
    icon: Shapes,
    title: 'Modelagem & Aprovação',
    text: 'Compartilhamos prévias 3D e coletamos feedback rápido antes de seguir para impressão.',
  },
  {
    icon: Clock,
    title: 'Produção & Pintura',
    text: 'Você recebe fotos das etapas-chave enquanto nossa equipe cuida dos mínimos detalhes.',
  },
  {
    icon: LifeBuoy,
    title: 'Entrega & Acompanhamento',
    text: 'Enviamos com embalagem segura e ficamos disponíveis para suporte pós-entrega.',
  },
]

const ServicosPage = () => {
  return (
    <main className="bg-primary text-secondary">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-accent"
          >
            Serviços From Stars 3D
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-3xl font-heading font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            Do conceito ao colecionável finalizado
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base text-gray-300 sm:text-lg"
          >
            Conte com uma equipe apaixonada por personagens, escultura digital e pintura para transformar ideias em peças únicas.
            Trabalhamos com prazos claros, comunicação constante e qualidade digna de vitrine.
          </motion.p>
          <a
            href="https://wa.me/5521986333478?text=ola%20quero%20planejar%20um%20projeto%203D"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-accentAlt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentAlt"
          >
            Fale com a artista
          </a>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30 backdrop-blur-sm"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <service.icon size={28} />
                </div>
                <h2 className="text-2xl font-heading font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm text-gray-300 sm:text-base">{service.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-gray-200 sm:text-base">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Sparkles size={16} className="mt-1 flex-shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-accent/30 bg-accent/10 p-10 shadow-lg shadow-accent/20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl font-heading font-semibold sm:text-3xl">Fluxo de criação transparente</h2>
              <p className="text-sm text-gray-100 sm:text-base">
                Você acompanha cada etapa com prazos combinados, prévias visuais e checkpoints de aprovação.
              </p>
            </div>
            <div className="flex-1 grid gap-6 md:grid-cols-2">
              {workflow.map((step) => (
                <div key={step.title} className="rounded-2xl bg-primary/70 p-6 shadow-inner shadow-black/20">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent">
                    <step.icon size={22} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-xl shadow-black/40 backdrop-blur-sm">
          <h2 className="text-2xl font-heading font-semibold sm:text-3xl">Pronto para começar agora?</h2>
          <p className="mt-4 text-sm text-gray-300 sm:text-base">
            Peça um orçamento personalizado ou faça login para acompanhar seus pedidos em andamento.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/5521986333478?text=ola%20quero%20um%20orcamento%203D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-accentAlt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentAlt sm:w-auto"
            >
              Solicitar orçamento
            </a>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent px-8 py-3 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
            >
              Acompanhar meus projetos
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServicosPage