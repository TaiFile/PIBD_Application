import React from 'react';
import type { Post } from '../types';
import { TipoReacao } from '../types';

interface ReactionButtonsProps {
  post: Post;
  onReact: (postId: number, reactionType: TipoReacao) => void;
}

const reactionEmojis: { [key in TipoReacao]: string } = {
  [TipoReacao.AGREE]: '👍',
  [TipoReacao.SUPPORT]: '❤️',
  [TipoReacao.OUTRAGEOUS]: '😡',
  [TipoReacao.URGENT]: '🚨',
  [TipoReacao.RELEVANT]: '💡',
};

const reactionLabels: { [key in TipoReacao]: string } = {
  [TipoReacao.AGREE]: 'Concordo',
  [TipoReacao.SUPPORT]: 'Apoio',
  [TipoReacao.OUTRAGEOUS]: 'Revoltante',
  [TipoReacao.URGENT]: 'Urgente',
  [TipoReacao.RELEVANT]: 'Relevante',
};

const reactionColors: { [key in TipoReacao]: { bg: string; text: string; border: string; hover: string } } = {
  [TipoReacao.AGREE]: { 
    bg: 'bg-green-50', 
    text: 'text-green-700', 
    border: 'border-green-200',
    hover: 'hover:bg-green-100'
  },
  [TipoReacao.SUPPORT]: { 
    bg: 'bg-red-50', 
    text: 'text-red-700', 
    border: 'border-red-200',
    hover: 'hover:bg-red-100'
  },
  [TipoReacao.OUTRAGEOUS]: { 
    bg: 'bg-orange-50', 
    text: 'text-orange-700', 
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100'
  },
  [TipoReacao.URGENT]: { 
    bg: 'bg-yellow-50', 
    text: 'text-yellow-700', 
    border: 'border-yellow-200',
    hover: 'hover:bg-yellow-100'
  },
  [TipoReacao.RELEVANT]: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100'
  },
};

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post, onReact }) => {
  const userReaction = post.userReaction;

  return (
    <div className="space-y-4">
      {/* Botões de Reação */}
      <div className="flex flex-wrap gap-2">
        {Object.values(TipoReacao).map(type => {
          const isActive = userReaction === type;
          const colors = reactionColors[type];
          
          return (
            <button
              key={type}
              onClick={() => onReact(post.id, type)}
              className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 font-medium text-sm btn-hover focus-ring ${
                isActive 
                  ? `${colors.bg} ${colors.text} ${colors.border} shadow-md transform scale-105` 
                  : `bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm ${colors.hover}`
              }`}
              title={
                isActive 
                  ? `Você reagiu com ${reactionLabels[type]} - Clique para trocar`
                  : `Clique para reagir com ${reactionLabels[type]}`
              }
            >
              <span className="text-xl transition-transform group-hover:scale-110">
                {reactionEmojis[type]}
              </span>
              <span className="font-semibold">{reactionLabels[type]}</span>
              
              {/* Indicador de seleção */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReactionButtons;