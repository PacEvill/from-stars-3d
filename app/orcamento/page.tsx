'use client';

import React, { useState } from 'react';

const BudgetPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ['model/stl', 'application/octet-stream', 'model/obj'];
      if (allowedTypes.includes(file.type) || file.name.endsWith('.stl') || file.name.endsWith('.obj')) {
        setSelectedFile(file);
        setFileName(file.name);
        setMessage('');
      } else {
        setSelectedFile(null);
        setFileName('');
        setMessage('Por favor, selecione um arquivo .STL ou .OBJ.');
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage('Por favor, selecione um arquivo para upload.');
      return;
    }

    setLoading(true);
    setMessage('Enviando seu arquivo...');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('fileName', fileName);

    // Aqui você integraria com um serviço de backend para processar o arquivo
    // Exemplo: fetch('/api/upload-budget', { method: 'POST', body: formData });

    try {
      // Simulação de upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('Arquivo enviado com sucesso! Entraremos em contato em breve com seu orçamento.');
      setSelectedFile(null);
      setFileName('');
    } catch (error) {
      setMessage('Erro ao enviar o arquivo. Por favor, tente novamente.');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Solicitar Orçamento</h1>
      <p className="text-lg text-center mb-12">Envie seu arquivo 3D (.STL ou .OBJ) para receber um orçamento personalizado.</p>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="file-upload" className="block text-gray-300 text-sm font-bold mb-2">
            Upload do Arquivo 3D (.STL ou .OBJ):
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                >
                  <span>Carregar um arquivo</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".stl,.obj" />
                </label>
                <p className="pl-1">ou arraste e solte</p>
              </div>
              <p className="text-xs text-gray-500">
                {fileName ? fileName : 'STL, OBJ até 10MB'}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Seu E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
            placeholder="seu.email@example.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Mensagem (opcional):</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
            placeholder="Detalhes adicionais sobre seu projeto..."
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn-primary w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Solicitar Orçamento'}
          </button>
        </div>

        {message && (
          <p className={`mt-4 text-center ${selectedFile ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default BudgetPage;