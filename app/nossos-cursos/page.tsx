import Link from 'next/link';

export default function CursosPage() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 text-center">
        <h1 className="text-4xl font-heading font-bold text-accent mb-4">Nossos Cursos</h1>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8 inline-block shadow-inner">
          <h2 className="text-2xl font-bold text-secondary mb-2">Em breve!</h2>
          <p className="text-gray-400">Estamos preparando os melhores cursos de modelagem e impressão 3D.</p>
          <p className="text-gray-400 mt-2 font-bold">Fique atualizado seguindo nossas redes!</p>
        </div>

        <div className="mt-8">
          <Link href="/" className="btn-primary">Voltar para Home</Link>
        </div>
      </div>
    </main>
  );
}
