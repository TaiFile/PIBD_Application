import React from 'react';
import type { Post } from '../types';
import { TipoReacao } from '../types';

interface ReactionButtonsProps {
  post: Post;
  onReact: (postId: number, reactionType: TipoReacao) => void;
}

const reactionEmojis: { [key in TipoReacao]: string } = {
  [TipoReacao.CONCORDO]: '👍',
  [TipoReacao.APOIO]: '❤️',
  [TipoReacao.REVOLTANTE]: '😡',
  [TipoReacao.URGENTE]: '🚨',
  [TipoReacao.RELEVANTE]: '💡',
};

const reactionLabels: { [key in TipoReacao]: string } = {
  [TipoReacao.CONCORDO]: 'Concordo',
  [TipoReacao.APOIO]: 'Apoio',
  [TipoReacao.REVOLTANTE]: 'Revoltante',
  [TipoReacao.URGENTE]: 'Urgente',
  [TipoReacao.RELEVANTE]: 'Relevante',
};

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post, onReact }) => {
  // Mock do ID do usuário logado (em app real, viria do contexto de auth)
  const userId = 1;

  return (
    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
      {Object.values(TipoReacao).map(type => {
        return (
          <button
            key={type}
            onClick={() => onReact(post.id, type)}
            className="flex items-center space-x-2 text-sm p-2 rounded-md transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            title={`Clique para reagir com ${reactionLabels[type]}`}
          >
            <span className="text-xl">{reactionEmojis[type]}</span>
            <span className="font-semibold">{reactionLabels[type]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;