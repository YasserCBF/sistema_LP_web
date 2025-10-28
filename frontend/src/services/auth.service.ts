import type { User } from '../types/models';

export const login = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'docente' && password === '123') {
        resolve({ id: 1, username: 'María González', role: 'docente' });
      } else if (username === 'adminb' && password === '123') {
        resolve({ id: 2, username: 'Carlos Pérez', role: 'admin_bienes' });
      } else if (username === 'adminl' && password === '123') {
        resolve({ id: 3, username: 'Ana López', role: 'admin_biblioteca' });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 0);
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};