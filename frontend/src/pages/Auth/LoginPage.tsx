// src/pages/Auth/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // AHORA EXISTE

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      const path = 
        username === 'docente' ? '/docente/dashboard' :
        username === 'adminb' ? '/admin-bienes/dashboard' :
        '/admin-biblioteca/dashboard';
      navigate(path);
    } catch {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>

        <div className={styles.help}>
          <p><strong>Prueba:</strong></p>
          <p>docente / 123</p>
          <p>adminb / 123 → Admin Bienes</p>
          <p>adminl / 123 → Admin Biblioteca</p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;