import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  familyName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  error: string | null;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Verificar se há usuário logado ao carregar
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      
      // Verificar se há token/sessão salva
      const savedUser = localStorage.getItem('familia_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setError('Erro ao carregar dados de autenticação');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simular login com Google (em produção, use Google OAuth)
      // Para demonstração, vou simular uma resposta de sucesso
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular loading

      // Dados mockados do usuário do Google
      const mockUser: User = {
        id: 'google_123456789',
        name: 'Maria Silva',
        email: 'maria.silva@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c', // URL padrão do Google
        familyName: 'Família Silva'
      };

      // Salvar no localStorage (em produção, use tokens JWT)
      try {
        localStorage.setItem('familia_user', JSON.stringify(mockUser));
        localStorage.setItem('familia_auth_token', 'mock_jwt_token_here');
      } catch (error) {
        console.error('Erro ao salvar dados de autenticação:', error);
        throw new Error('Erro ao salvar dados de login');
      }
      
      setUser(mockUser);

      // Em produção, você faria algo assim:
      /*
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleToken })
      });
      
      if (response.ok) {
        const { user, token } = await response.json();
        localStorage.setItem('familia_auth_token', token);
        setUser(user);
      }
      */
      
    } catch (error) {
      setError('Erro ao fazer login com Google. Tente novamente.');
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('familia_user');
      localStorage.removeItem('familia_auth_token');
      setIsSettingsOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithGoogle,
    logout,
    error,
    isSettingsOpen,
    openSettings,
    closeSettings
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.error('useAuth deve ser usado dentro de AuthProvider');
    // Return default values instead of throwing to prevent crashes
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      loginWithGoogle: async () => {},
      logout: () => {},
      error: null,
      isSettingsOpen: false,
      openSettings: () => {},
      closeSettings: () => {}
    };
  }
  return context;
}