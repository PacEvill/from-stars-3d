import Link from 'next/link';
import { Instagram, Mail, Video, MessageCircle } from 'lucide-react';

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 text-center">
        <h1 className="text-4xl font-heading font-bold text-accent mb-4">Contato</h1>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8 inline-block shadow-inner">
          <h2 className="text-2xl font-bold text-secondary mb-2">Em breve!</h2>
          <p className="text-gray-400">Fique atualizado seguindo nossas redes para novidades sobre o lançamento completo dessa página.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="bg-gray-700/50 p-6 rounded-xl hover:bg-gray-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Instagram className="mr-2 text-accent" /> Instagram
            </h3>
            <a href="https://instagram.com/from.stars.3d" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-accent flex items-center">
              @from.stars.3d
            </a>
          </div>

          <div className="bg-gray-700/50 p-6 rounded-xl hover:bg-gray-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Video className="mr-2 text-accent" /> TikTok
            </h3>
            <a href="https://tiktok.com/@from.stars.3d" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-accent">
              @from.stars.3d
            </a>
          </div>

          <div className="bg-gray-700/50 p-6 rounded-xl hover:bg-gray-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <MessageCircle className="mr-2 text-accent" /> WhatsApp
            </h3>
            <a href="https://wa.me/5521986333478" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-accent">
              (21) 98633-3478
            </a>
          </div>

          <div className="bg-gray-700/50 p-6 rounded-xl hover:bg-gray-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Mail className="mr-2 text-accent" /> E-mail
            </h3>
            <a href="mailto:fromstars3d@gmail.com" className="text-gray-300 hover:text-accent break-all">
              fromstars3d@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="btn-primary">Voltar para Home</Link>
        </div>
      </div>
    </main>
  );
}