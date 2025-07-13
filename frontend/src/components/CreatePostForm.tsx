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

const categoriaIcons: { [key in Categoria]: string } = {
  [Categoria.RECLAMACAO]: '⚠️',
  [Categoria.DUVIDA]: '❓',
  [Categoria.REQUISICAO]: '📋',
  [Categoria.ELOGIO]: '⭐',
  [Categoria.DENUNCIA]: '🚨',
};

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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header do Formulário */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Nova Publicação</h2>
            <p className="text-blue-100 text-sm">Compartilhe sua observação ou solicitação</p>
          </div>
        </div>
      </div>

      {/* Conteúdo do Formulário */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Título da Publicação
            </label>
            <input
              type="text"
              placeholder="Digite um título claro e objetivo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              minLength={5}
              maxLength={100}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mínimo 5 caracteres</span>
              <span>{title.length}/100</span>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Categoria
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {categorias.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                    category === cat
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-2xl">{categoriaIcons[cat]}</span>
                  <span className="text-xs font-medium">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descrição Detalhada
            </label>
            <textarea
              placeholder="Descreva sua solicitação ou observação de forma detalhada..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Seja específico e detalhado</span>
              <span>{content.length}/1000</span>
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Localização
            </label>
            <input
              type="text"
              placeholder="Endereço, bairro ou ponto de referência"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          {/* Descrição Adicional */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informações Adicionais (Opcional)
            </label>
            <textarea
              placeholder="Informações complementares, contexto adicional..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
              maxLength={255}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Informações extras que possam ajudar</span>
              <span>{description.length}/255</span>
            </div>
          </div>

          {/* Botão de Envio */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-md flex items-center justify-center space-x-2 btn-hover focus-ring"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Publicar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;