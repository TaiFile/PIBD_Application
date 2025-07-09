import axios from 'axios';
import type { Post, NewPost, NewReaction } from '../types';

// URL base da sua API backend. Altere quando tiver a URL real.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Exemplo de URL do backend Java
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- MOCK DATA (remover quando o backend estiver funcional) ---
import { TipoReacao, Categoria } from '../types';

const mockPosts: Post[] = [
  {
    id: 1,
    titulo: 'Buraco na rua principal do centro',
    texto: 'Existe um buraco perigoso na Avenida São Carlos, próximo ao número 500. Vários carros já tiveram problemas. Precisamos de um reparo urgente!',
    criado_em: '2025-07-08T10:00:00Z',
    categoria: Categoria.RECLAMACAO,
    autor: { id: 101, nome: 'João da Silva' },
    reacoes: { 2: TipoReacao.Urgente, 3: TipoReacao.Revoltante },
  },
  {
    id: 2,
    titulo: 'Elogio à nova iluminação do Parque do Kartódromo',
    texto: 'Gostaria de parabenizar a prefeitura pela instalação das novas luzes de LED no parque. O local está muito mais seguro e agradável para caminhadas noturnas.',
    criado_em: '2025-07-07T18:30:00Z',
    categoria: Categoria.ELOGIO,
    autor: { id: 102, nome: 'Maria Oliveira' },
    reacoes: { 1: TipoReacao.Apoio, 3: TipoReacao.Relevante },
  },
];
let nextPostId = 3;
// --- FIM DO MOCK DATA ---


export const getPosts = async (): Promise<Post[]> => {
  // Descomente a linha abaixo e remova o mock quando o backend estiver pronto
  // const response = await apiClient.get<Post[]>('/posts');
  // return response.data;
  
  console.log('API MOCK: Buscando todos os posts...');
  return new Promise(resolve => setTimeout(() => resolve(mockPosts), 500));
};

export const createPost = async (postData: NewPost): Promise<Post> => {
  // Descomente a linha abaixo e remova o mock quando o backend estiver pronto
  // const response = await apiClient.post<Post>('/posts', postData);
  // return response.data;
  
  console.log('API MOCK: Criando novo post:', postData);
  const newPost: Post = {
    id: nextPostId++,
    ...postData,
    criado_em: new Date().toISOString(),
    autor: { id: postData.id_usuario, nome: 'Usuário Logado' }, // Nome mockado
    reacoes: {},
  };
  mockPosts.unshift(newPost); // Adiciona no início da lista
  return new Promise(resolve => setTimeout(() => resolve(newPost), 500));
};


export const createReactionToPost = async (reactionData: NewReaction): Promise<{ success: boolean }> => {
    // Descomente a linha abaixo e remova o mock quando o backend estiver pronto
    // const response = await apiClient.post('/posts/reagir', reactionData);
    // return response.data;

    console.log('API MOCK: Reagindo ao post:', reactionData);
    const post = mockPosts.find(p => p.id === reactionData.id_post);
    if (post) {
        // O usuário pode reagir apenas uma vez, mas pode trocar o tipo de reação
        post.reacoes[reactionData.id_usuario] = reactionData.tipo;
    }
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 300));
};