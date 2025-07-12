import React from 'react';
import type { Post } from '../types';
import { TipoReacao, Categoria, Status } from '../types';
import ReactionButtons from './ReactionButtons';

interface PostCardProps {
  post: Post;
  onReact: (postId: number, reactionType: TipoReacao) => void;
}

const categoriaCores: { [key in Categoria]: string } = {
  [Categoria.RECLAMACAO]: 'bg-red-100 text-red-800',
  [Categoria.DUVIDA]: 'bg-yellow-100 text-yellow-800',
  [Categoria.REQUISICAO]: 'bg-blue-100 text-blue-800',
  [Categoria.ELOGIO]: 'bg-green-100 text-green-800',
  [Categoria.DENUNCIA]: 'bg-purple-100 text-purple-800',
};

const statusCores: { [key in Status]: string } = {
  [Status.ABERTO]: 'bg-green-100 text-green-800',
  [Status.EM_AVALIACAO]: 'bg-yellow-100 text-yellow-800',
  [Status.RESPONDIDO]: 'bg-blue-100 text-blue-800',
  [Status.FECHADO]: 'bg-gray-100 text-gray-800',
  [Status.ARQUIVADO]: 'bg-purple-100 text-purple-800',
};

const PostCard: React.FC<PostCardProps> = ({ post, onReact }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoriaCores[post.category]}`}>
            {post.category}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusCores[post.status]}`}>
            {post.status}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-2">{post.content}</p>
      
      {post.description && (
        <p className="text-gray-600 text-sm mb-2">{post.description}</p>
      )}
      
      {post.location && (
        <p className="text-gray-500 text-sm mb-4">
          📍 {post.location}
        </p>
      )}

      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Mídias anexadas:</p>
          <div className="flex gap-2">
            {post.mediaUrls.map((url, index) => (
              <a 
                key={index} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Mídia {index + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{post.reactionsCount} reações</span>
        <span>{post.commentsCount} comentários</span>
      </div>

      <ReactionButtons post={post} onReact={onReact} />
    </div>
  );
};

export default PostCard;