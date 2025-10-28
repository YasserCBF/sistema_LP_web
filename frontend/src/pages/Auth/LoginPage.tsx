// src/pages/Auth/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let username = '';
      if (dni === '12345678') username = 'docente';
      else if (dni === '87654321') username = 'adminb';
      else if (dni === '11223344') username = 'adminl';
      else throw new Error('DNI no registrado');

      await login(username, password);
      const path = 
        username === 'docente' ? '/docente/dashboard' :
        username === 'adminb' ? '/admin-bienes/dashboard' :
        '/admin-biblioteca/dashboard';
      navigate(path);
    } catch {
      alert('DNI o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* === IMAGEN DEL COLEGIO === */}
        <div className={styles.logo}>
          <img 
            src="/logo-colegio.png" 
            alt="Escudo del Colegio" 
            className={styles.shield}
          />
        </div>

        <h1 className={styles.title}>Sistema LP</h1>
        <p className={styles.subtitle}>Ingrese su DNI y contraseña</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            maxLength={8}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>

        <div className={styles.help}>
          <p><strong>Prueba:</strong></p>
          <p>DNI: 12345678 → docente</p>
          <p>DNI: 87654321 → Admin Bienes</p>
          <p>DNI: 11223344 → Admin Biblioteca</p>
          <p>Contraseña: <strong>123</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;