import React, { useState } from 'react';
import { Categoria } from '../types';
import type { NewPost } from '../types';

interface CreatePostFormProps {
  onSubmit: (post: NewPost) => void;
  isSubmitting: boolean;
}

const categorias: Categoria[] = [
  Categoria.RECLAMACAO,
  Categoria.DUVIDA,
  Categoria.REQUISICAO,
  Categoria.ELOGIO,
  Categoria.DENUNCIA,
];

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [locality, setLocality] = useState('');
  const [category, setCategory] = useState<Categoria>(Categoria.RECLAMACAO);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !locality.trim()) {
      alert('Título, conteúdo e localização são obrigatórios.');
      return;
    }
    
    onSubmit({ 
      title, 
      content, 
      description: description.trim() || undefined, 
      locality, 
      category,
      mediaUrls: []
    });
    
    setTitle('');
    setContent('');
    setDescription('');
    setLocality('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Crie uma nova publicação</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
          <input
            type="text"
            placeholder="Título da sua publicação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            minLength={5}
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo</label>
          <textarea
            placeholder="Descreva sua solicitação ou observação"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={1000}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição (opcional)</label>
          <textarea
            placeholder="Descrição adicional (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={255}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
          <input
            type="text"
            placeholder="Local onde ocorreu o fato"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Categoria)}
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;