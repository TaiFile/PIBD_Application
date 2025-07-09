import React from 'react';
import type { Post } from '../types';
import { TipoReacao, Categoria } from '../types';
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

const PostCard: React.FC<PostCardProps> = ({ post, onReact }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <div>
          <p className="font-bold text-gray-900">{post.autor.nome}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.titulo}</h3>
      <p className="text-gray-700 mb-4">{post.texto}</p>
      
      <div className="flex justify-between items-center">
         <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoriaCores[post.categoria]}`}>
            {post.categoria}
        </span>
      </div>

      <ReactionButtons post={post} onReact={onReact} />
    </div>
  );
};

export default PostCard;