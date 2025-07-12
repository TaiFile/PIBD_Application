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
  const userReaction = post.userReaction;

  return (
    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
      {Object.values(TipoReacao).map(type => {
        const isActive = userReaction === type;
        
        return (
          <button
            key={type}
            onClick={() => onReact(post.id, type)}
            className={`flex items-center space-x-2 text-sm p-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title={
              isActive 
                ? `Você reagiu com ${reactionLabels[type]} - Clique para trocar`
                : `Clique para reagir com ${reactionLabels[type]}`
            }
          >
            <span className="text-xl">{reactionEmojis[type]}</span>
            <span className="font-semibold">{reactionLabels[type]}</span>
          </button>
        );
      })}
      
      {userReaction && (
        <div className="ml-auto text-sm text-gray-500">
          Você reagiu com {reactionLabels[userReaction]}
        </div>
      )}
    </div>
  );
};

export default ReactionButtons;