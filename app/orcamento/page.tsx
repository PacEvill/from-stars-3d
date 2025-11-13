'use client';

import React, { useState } from 'react';

const BudgetPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const is3D = ['model/stl', 'application/octet-stream', 'model/obj'].includes(file.type) || file.name.toLowerCase().endsWith('.stl') || file.name.toLowerCase().endsWith('.obj')
      const isImage = file.type.startsWith('image/') || ['.jpg','.jpeg','.png','.webp','.gif'].some(ext => file.name.toLowerCase().endsWith(ext))
      if (is3D || isImage) {
        setSelectedFile(file);
        setFileName(file.name);
        setMessage('');
      } else {
        setSelectedFile(null);
        setFileName('');
        setMessage('Por favor, selecione um arquivo .STL, .OBJ ou uma imagem (JPG/PNG/WEBP/GIF).');
      }
    }
  };

  const handleReferenceImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files)
      const validFiles = files.filter(file => file.type.startsWith('image/'))
      
      if (validFiles.length !== files.length) {
        setMessage('Algumas imagens não são válidas. Use JPG, PNG, WEBP ou GIF.')
        return
      }

      // Limitar a 5 imagens
      if (validFiles.length > 5) {
        setMessage('Máximo de 5 imagens de referência permitidas.')
        return
      }

      // Validar tamanho de cada imagem (5MB cada)
      const maxSize = 5 * 1024 * 1024
      const oversized = validFiles.some(file => file.size > maxSize)
      if (oversized) {
        setMessage('Uma ou mais imagens excedem 5MB.')
        return
      }

      setReferenceImages(validFiles)
      setMessage('')
    }
  }

  const removeReferenceImage = (index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage('Por favor, selecione um arquivo (.STL/.OBJ ou uma imagem) para upload.');
      return;
    }

    const form = event.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement;

    if (!emailInput.value) {
      setMessage('Por favor, informe seu e-mail.');
      return;
    }

    setLoading(true);
    setMessage('Enviando seu arquivo...');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', emailInput.value);
    formData.append('message', messageInput.value || '');
    
    // Adicionar múltiplas imagens de referência
    referenceImages.forEach((img, index) => {
      formData.append(`referenceImage${index}`, img)
    })
    formData.append('referenceImageCount', String(referenceImages.length))

    try {
      const response = await fetch('/api/orcamento', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar orçamento.');
      }

      setMessage(data.message);
      setSelectedFile(null);
      setReferenceImages([]);
      setFileName('');
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao enviar o arquivo. Por favor, tente novamente.');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Solicitar Orçamento</h1>
  <p className="text-lg text-center mb-12">Envie seu arquivo 3D (.STL ou .OBJ) ou uma imagem de referência para receber um orçamento personalizado.</p>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="file-upload" className="block text-gray-300 text-sm font-bold mb-2">
            Upload do Arquivo (.STL, .OBJ ou Imagem):
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
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".stl,.obj,.jpg,.jpeg,.png,.webp,.gif,image/*" />
                </label>
                <p className="pl-1">ou arraste e solte</p>
              </div>
              <p className="text-xs text-gray-500">
                {fileName ? fileName : 'STL, OBJ até 10MB ou imagem (JPG/PNG/WEBP/GIF) até 5MB'}
              </p>
            </div>
          </div>
        </div>

        {/* Imagens de Referência (múltiplas) */}
        <div className="mb-6">
          <label htmlFor="ref-upload" className="block text-gray-300 text-sm font-bold mb-2">
            Imagens de referência (opcional, até 5):
          </label>
          <input
            id="ref-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleReferenceImageChange}
            className="w-full text-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
          {referenceImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {referenceImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Referência ${index + 1}`}
                    className="w-full h-24 object-cover rounded border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeReferenceImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <p className="text-xs text-gray-400 mt-1 truncate">{img.name}</p>
                </div>
              ))}
            </div>
          )}
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