export enum Categoria {
  RECLAMACAO = 'RECLAMACAO',
  DUVIDA = 'DUVIDA',
  REQUISICAO = 'REQUISICAO',
  ELOGIO = 'ELOGIO',
  DENUNCIA = 'DENUNCIA',
}

export enum TipoReacao {
  Concordo = 'Concordo',
  Apoio = 'Apoio',
  Revoltante = 'Revoltante',
  Urgente = 'Urgente',
  Relevante = 'Relevante',
}

export interface User {
  id: number;
  nome: string;
}

export interface Post {
  id: number;
  titulo: string;
  texto: string;
  criado_em: string;
  categoria: Categoria;
  autor: User;
  reacoes: { [userId: number]: TipoReacao };
}

export interface NewPost {
  titulo: string;
  texto: string;
  categoria: Categoria;
  id_usuario: number;
}

export interface NewReaction {
    id_usuario: number;
    id_post: number;
    tipo: TipoReacao;
}