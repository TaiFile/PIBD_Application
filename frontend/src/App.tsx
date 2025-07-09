import { useState, useEffect } from 'react';
import PostCard from './components/PostCard';
import CreatePostForm from './components/CreatePostForm';
import { getPosts, createPost, createReactionToPost } from './services/api';
import type { Post, NewPost } from './types';
import { TipoReacao } from './types';
import './App.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (postData: NewPost) => {
    setIsSubmitting(true);
    try {
      const newPost = await createPost(postData);
      setPosts(currentPosts => [newPost, ...currentPosts]);
    } catch (error) {
      console.error("Erro ao criar post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReactToPost = async (postId: number, reactionType: TipoReacao) => {
    // Mock do ID do usuário logado
    const userId = 1;
    // Atualização otimista da UI: usuário só pode ter uma reação por post
    setPosts(currentPosts => currentPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          reacoes: { ...p.reacoes, [userId]: reactionType },
        };
      }
      return p;
    }));

    try {
      await createReactionToPost({ id_post: postId, tipo: reactionType, id_usuario: userId });
    } catch (error) {
      console.error("Erro ao reagir ao post:", error);
      // Reverter a UI em caso de erro (lógica mais complexa, omitida para simplicidade)
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-600">Portal do Cidadão</h1>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <CreatePostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />

          {isLoading ? (
            <p className="text-center text-gray-500">Carregando publicações...</p>
          ) : (
            <div>
              {posts.map(post => (
                <PostCard key={post.id} post={post} onReact={handleReactToPost} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App;