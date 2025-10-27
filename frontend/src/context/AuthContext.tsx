// src/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/auth.service';
import type { ReactNode } from 'react';
import type { User } from '../types/models';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // LEE USUARIO DE localStorage AL INICIAR
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);

  const login = async (username: string, password: string) => {
    const userData = await apiLogin(username, password);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Guarda
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    localStorage.removeItem('user'); // Borra
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};