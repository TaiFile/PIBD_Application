export enum Categoria {
  COMPLAINT = 'COMPLAINT',
  QUESTION = 'QUESTION',
  REQUEST = 'REQUEST',
  COMPLIMENT = 'COMPLIMENT',
  DENUNCIATION = 'DENUNCIATION',
}

export enum Status {
  OPEN = 'OPEN',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RESPONDED = 'RESPONDED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum TipoReacao {
  AGREE = 'AGREE',
  SUPPORT = 'SUPPORT',
  OUTRAGEOUS = 'OUTRAGEOUS',
  URGENT = 'URGENT',
  RELEVANT = 'RELEVANT',
}

export interface User {
  id: number;
  email: string;
  papel: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  description?: string;
  location: string;
  createdAt: string;
  category: Categoria;
  status: Status;
  mediaUrls: string[];
  reactionsCount: number;
  commentsCount: number;
  userReaction?: TipoReacao | null; // Reação do usuário atual (se houver)
}

export interface NewPost {
  title: string;
  content: string;
  description?: string;
  locality: string;
  category: Categoria;
  mediaUrls?: string[];
}

export interface NewReaction {
  id_usuario: number;
  id_post: number;
  tipo: TipoReacao;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

export interface NewComment {
  content: string;
}