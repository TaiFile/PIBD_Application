import React from 'react';
import type { Post } from '../types';
import { TipoReacao, Categoria, Status } from '../types';
import ReactionButtons from './ReactionButtons';

interface PostCardProps {
  post: Post;
  onReact: (postId: number, reactionType: TipoReacao) => void;
}

const categoriaCores: { [key in Categoria]: { bg: string; text: string; border: string } } = {
  [Categoria.RECLAMACAO]: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  [Categoria.DUVIDA]: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  [Categoria.REQUISICAO]: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  [Categoria.ELOGIO]: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  [Categoria.DENUNCIA]: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

const statusCores: { [key in Status]: { bg: string; text: string; border: string } } = {
  [Status.ABERTO]: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  [Status.EM_AVALIACAO]: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  [Status.RESPONDIDO]: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  [Status.FECHADO]: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
  [Status.ARQUIVADO]: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

const categoriaIcons: { [key in Categoria]: string } = {
  [Categoria.RECLAMACAO]: '⚠️',
  [Categoria.DUVIDA]: '❓',
  [Categoria.REQUISICAO]: '📋',
  [Categoria.ELOGIO]: '⭐',
  [Categoria.DENUNCIA]: '🚨',
};

const PostCard: React.FC<PostCardProps> = ({ post, onReact }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else if (diffInHours < 48) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric'
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header do Card */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Cidadão</p>
              <p className="text-xs text-gray-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoriaCores[post.category].bg} ${categoriaCores[post.category].text} ${categoriaCores[post.category].border}`}>
              <span className="mr-1">{categoriaIcons[post.category]}</span>
              {post.category}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusCores[post.status].bg} ${statusCores[post.status].text} ${statusCores[post.status].border}`}>
              {post.status}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h3>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Conteúdo Adicional */}
      {(post.description || post.location || (post.mediaUrls && post.mediaUrls.length > 0)) && (
        <div className="px-8 py-4 bg-gray-50">
          {post.description && (
            <div className="mb-3">
              <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
            </div>
          )}
          
          {post.location && (
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{post.location}</span>
            </div>
          )}

          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Mídias anexadas
              </p>
              <div className="flex gap-2">
                {post.mediaUrls.map((url, index) => (
                  <a 
                    key={index} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Mídia {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Estatísticas */}
      <div className="px-8 py-4 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="font-medium">{post.reactionsCount} reações</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">{post.commentsCount} comentários</span>
            </div>
          </div>
        </div>

        <ReactionButtons post={post} onReact={onReact} />
      </div>
    </div>
  );
};

export default PostCard;