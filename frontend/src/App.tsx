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
      alert('Erro ao criar post. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReactToPost = async (postId: number, reactionType: TipoReacao) => {
    // Mock do ID do usuário logado
    const userId = 1;
    
    // Verificar se o usuário já reagiu com a mesma reação
    const currentPost = posts.find(p => p.id === postId);
    if (currentPost?.userReaction === reactionType) {
      // Se clicou na mesma reação, não faz nada
      return;
    }
    
    try {
      await createReactionToPost({ id_post: postId, tipo: reactionType, id_usuario: userId });
      
      // Atualização otimista da UI
      setPosts(currentPosts => currentPosts.map(p => {
        if (p.id === postId) {
          const wasFirstReaction = p.userReaction === null || p.userReaction === undefined;
          return {
            ...p,
            reactionsCount: wasFirstReaction ? p.reactionsCount + 1 : p.reactionsCount, // Só incrementa se for primeira reação
            userReaction: reactionType
          };
        }
        return p;
      }));
    } catch (error) {
      console.error("Erro ao reagir ao post:", error);
      alert('Erro ao reagir ao post. Tente novamente.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-600">Portal do Cidadão</h1>
          <p className="text-gray-600 mt-1">Compartilhe suas observações e solicitações com a prefeitura</p>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <CreatePostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-2">Carregando publicações...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma publicação encontrada.</p>
              <p className="text-gray-400 text-sm">Seja o primeiro a criar uma publicação!</p>
            </div>
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