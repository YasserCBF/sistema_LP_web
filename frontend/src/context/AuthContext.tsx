// src/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface User {
  role: 'docente' | 'adminb' | 'adminl';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (role: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (password !== '123') return reject();
        
        const users: Record<string, { name: string }> = {
          docente: { name: 'María González' },
          adminb: { name: 'Carlos Pérez' },
          adminl: { name: 'Ana López' }
        };

        setUser({ role: role as any, name: users[role].name });
        resolve();
      }, 800);
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};