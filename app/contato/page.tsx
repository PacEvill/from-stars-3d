'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files ? e.target.files[0] : null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    if (formData.file) {
      data.append('file', formData.file);
    }

    // Simulate API call
    console.log('Form submitted with data:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Pedido de orçamento enviado com sucesso!');
        setFormData({ name: '', email: '', message: '', file: null });
      } else {
        const errorData = await response.json();
        alert(`Erro ao enviar pedido: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao enviar seu pedido. Tente novamente mais tarde.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Entre em Contato</h1>
        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Tem alguma dúvida, sugestão ou quer fazer um orçamento? Envie-nos uma mensagem ou utilize nossos contatos diretos.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Send Message Form */}
          <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-secondary">Envie sua Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="file" className="block text-gray-300 text-sm font-bold mb-2">
                  Anexar Arquivo (.STL, .OBJ, .ZIP, .RAR, .PDF)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accentAlt"
                  accept=".stl,.obj,.zip,.rar,.pdf"
                />
              </div>
              <button
                type="submit"
                className="bg-accent hover:bg-accentAlt text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-secondary">Contato Direto e Informações</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-accent" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-300">Email</h3>
                  <a href="mailto:contato@fromstars3d.com" className="text-gray-400 hover:text-accent transition-colors duration-300">
                    contato@fromstars3d.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-accent" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-300">Telefone</h3>
                  <a href="https://wa.me/5521986333478" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors duration-300">
                    +55 21 98633-3478
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-accent" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-300">Endereço</h3>
                  <p className="text-gray-400">Rio de Janeiro, Brasil</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-300">Horário de Atendimento</h3>
              <p className="text-gray-400">Segunda a Sexta: 9h - 18h</p>
              <p className="text-gray-400">Sábado: 9h - 13h</p>
              <p className="text-gray-400">Domingo: Fechado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}