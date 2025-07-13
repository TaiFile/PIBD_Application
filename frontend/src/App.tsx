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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="header-gradient shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Portal do Cidadão</h1>
                <p className="text-blue-100 mt-1 font-medium">Conectando cidadãos e governo</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{posts.length}</div>
                <div className="text-blue-200 text-sm">Publicações</div>
              </div>
              <div className="w-px h-8 bg-blue-500"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {posts.reduce((acc, post) => acc + post.reactionsCount, 0)}
                </div>
                <div className="text-blue-200 text-sm">Interações</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Create Post Section */}
          <div className="mb-12">
            <CreatePostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />
          </div>

          {/* Posts Section */}
          <div className="space-y-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{animationDelay: '0.5s'}}></div>
                </div>
                <p className="text-gray-600 mt-6 text-lg font-medium">Carregando publicações...</p>
                <p className="text-gray-400 text-sm mt-2">Aguarde um momento</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhuma publicação encontrada</h3>
                <p className="text-gray-500 mb-4">Seja o primeiro a criar uma publicação e contribuir para a comunidade!</p>
                <div className="inline-flex items-center space-x-2 text-blue-600 font-medium">
                  <span>Clique no formulário acima para começar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <div key={post.id} className="post-card-enter" style={{ animationDelay: `${index * 0.1}s` }}>
                    <PostCard post={post} onReact={handleReactToPost} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-500">
            <p className="text-sm">© 2024 Portal do Cidadão. Desenvolvido para conectar cidadãos e governo.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;