'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, Send, Star } from 'lucide-react'

const CTASection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: false, error: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: '' })
    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus({ loading: false, success: true, error: '' })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-gray-800 to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6"
          >
            Vamos <span className="text-gradient">Conversar</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Tem uma ideia para uma peça personalizada? Quer encomendar algo especial? 
            Estou aqui para transformar sua visão em realidade!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-2xl font-heading font-semibold text-secondary mb-6">
              Envie sua Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-secondary font-medium mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-secondary font-medium mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-secondary font-medium mb-2">
                  Assunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="input-field"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="encomenda">Encomenda de Peça</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="duvida">Dúvida sobre Processo</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-secondary font-medium mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Conte-me sobre sua ideia, personagem favorito ou qualquer detalhe que queira compartilhar..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.loading ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Enviar Mensagem
                  </>
                )}
              </button>
              {status.success && <p className="text-green-400 text-center mt-4">Mensagem enviada com sucesso!</p>}
              {status.error && <p className="text-red-400 text-center mt-4">{status.error}</p>}
            </form>
          </motion.div>

          {/* Contact Info & WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* WhatsApp CTA */}
            <div className="card bg-gradient-to-br from-green-600/20 to-green-500/20 border-green-500/30">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-secondary">
                  Contato Direto
                </h3>
                <p className="text-gray-300">
                  Prefere um contato mais direto? Me chame no WhatsApp para conversarmos sobre sua ideia!
                </p>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Olá! Vi seu site e gostaria de conversar sobre uma encomenda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chamar no WhatsApp</span>
                </a>
                <p className="text-sm text-gray-400">
                  {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <h3 className="text-2xl font-heading font-semibold text-secondary mb-6">
                Informações de Contato
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-secondary font-medium">Camila</p>
                    <p className="text-gray-400 text-sm">Artista & Criadora</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-secondary font-medium">E-mail</p>
                    <p className="text-gray-400 text-sm">{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contato@fromstars3d.com'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-secondary font-medium">WhatsApp</p>
                    <p className="text-gray-400 text-sm">{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-gray-600">
                <p className="text-secondary font-medium mb-3">Siga-me nas Redes</p>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/from.stars.3d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accentAlt transition-colors duration-300"
                  >
                    @from.stars.3d
                  </a>
                  <a
                    href="https://tiktok.com/@from.stars.3d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accentAlt transition-colors duration-300"
                  >
                    @from.stars.3d
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection