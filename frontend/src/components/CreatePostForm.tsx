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
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState<Categoria>(Categoria.RECLAMACAO);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) {
      alert('Título e texto são obrigatórios.');
      return;
    }
    // Mock do ID do usuário logado. Em um app real, viria do contexto de autenticação.
    const id_usuario = 1; 
    onSubmit({ titulo, texto, categoria, id_usuario });
    setTitulo('');
    setTexto('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Crie uma nova publicação</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Título da sua publicação"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="O que você está pensando?"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
           <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as Categoria)}
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