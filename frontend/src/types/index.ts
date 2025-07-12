export enum Categoria {
  RECLAMACAO = 'RECLAMACAO',
  DUVIDA = 'DUVIDA',
  REQUISICAO = 'REQUISICAO',
  ELOGIO = 'ELOGIO',
  DENUNCIA = 'DENUNCIA',
}

export enum Status {
  ABERTO = 'ABERTO',
  EM_AVALIACAO = 'EM_AVALIACAO',
  RESPONDIDO = 'RESPONDIDO',
  FECHADO = 'FECHADO',
  ARQUIVADO = 'ARQUIVADO',
}

export enum TipoReacao {
  CONCORDO = 'CONCORDO',
  APOIO = 'APOIO',
  REVOLTANTE = 'REVOLTANTE',
  URGENTE = 'URGENTE',
  RELEVANTE = 'RELEVANTE',
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
  description: string;
  location: string;
  createdAt: string;
  category: Categoria;
  status: Status;
  mediaUrls: string[];
  reactionsCount: number;
  commentsCount: number;
}

export interface NewPost {
  title: string;
  content: string;
  description: string;
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