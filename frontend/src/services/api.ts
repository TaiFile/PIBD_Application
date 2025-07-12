import axios from 'axios';
import type { Post, NewPost, NewReaction } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts');
  return response.data;
};

export const createPost = async (postData: NewPost): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', postData);
  return response.data;
};


export const createReactionToPost = async (reactionData: NewReaction): Promise<{ success: boolean }> => {
    const response = await apiClient.post('/posts/reactions', reactionData);
    return response.data;
};