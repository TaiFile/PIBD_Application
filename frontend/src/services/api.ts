import axios from 'axios';
import type { Post, NewPost, NewReaction, Comment, NewComment } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock user ID - em produção isso viria de autenticação
const MOCK_USER_ID = 1;

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts');
  return response.data;
};

export const createPost = async (postData: NewPost): Promise<Post> => {
  const response = await apiClient.post<Post>(`/posts?userId=${MOCK_USER_ID}`, postData);
  return response.data;
};

export const createReactionToPost = async (reactionData: NewReaction): Promise<{ success: boolean }> => {
  const response = await apiClient.post('/posts/reactions', reactionData);
  return response.data;
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await apiClient.get<Comment[]>(`/comments?postId=${postId}`);
  return response.data;
};

export const createComment = async (postId: number, commentData: NewComment): Promise<Comment> => {
  const response = await apiClient.post<Comment>(`/comments?userId=${MOCK_USER_ID}&postId=${postId}`, commentData);
  return response.data;
};