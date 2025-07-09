import React from 'react';
import type { Post } from '../types';
import { TipoReacao } from '../types';

interface ReactionButtonsProps {
  post: Post;
  onReact: (postId: number, reactionType: TipoReacao) => void;
}

const reactionEmojis: { [key in TipoReacao]: string } = {
  [TipoReacao.Concordo]: '👍',
  [TipoReacao.Apoio]: '❤️',
  [TipoReacao.Revoltante]: '😡',
  [TipoReacao.Urgente]: '🚨',
  [TipoReacao.Relevante]: '💡',
};

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post, onReact }) => {
  // Mock do ID do usuário logado (em app real, viria do contexto de auth)
  const userId = 1;
  // Descobre a reação do usuário logado
  const userReaction = post.reacoes[userId];

  // Conta quantos usuários escolheram cada tipo de reação
  const reactionCounts: Record<TipoReacao, number> = {
    [TipoReacao.Concordo]: 0,
    [TipoReacao.Apoio]: 0,
    [TipoReacao.Revoltante]: 0,
    [TipoReacao.Urgente]: 0,
    [TipoReacao.Relevante]: 0,
  };
  Object.values(post.reacoes).forEach(tipo => {
    reactionCounts[tipo]++;
  });

  return (
    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
      {Object.keys(reactionEmojis).map(key => {
        const type = key as TipoReacao;
        const count = reactionCounts[type];
        const isActive = userReaction === type;
        return (
          <button
            key={type}
            onClick={() => onReact(post.id, type)}
            className={`flex items-center space-x-2 text-sm p-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
            disabled={isActive}
            title={isActive ? 'Você já reagiu assim' : 'Clique para reagir'}
          >
            <span className="text-xl">{reactionEmojis[type]}</span>
            <span className="font-semibold">{count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;