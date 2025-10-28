import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { LogIn, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const users: Record<string, { role: string; name: string }> = {
        '12345678': { role: 'docente', name: 'María González' },
        '87654321': { role: 'adminb', name: 'Carlos Pérez' },
        '11223344': { role: 'adminl', name: 'Ana López' }
      };

      const user = users[dni];
      if (!user) throw new Error('DNI no encontrado');

      // Simular login
      await new Promise(resolve => setTimeout(resolve, 800));
      await login(user.role, password);

      // Redirigir
      const path =
        user.role === 'docente' ? '/docente/dashboard' :
        user.role === 'adminb' ? '/admin-bienes/dashboard' :
        '/admin-biblioteca/dashboard';

      navigate(path);
    } catch (error) {
      alert('DNI o contraseña incorrectos');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* === HEADER === */}
        <div className={styles.header}>
          <img 
            src="/logo-colegio.png" 
            alt="Colegio LP" 
            className={styles.logo} 
          />
          <h1 className={styles.title}>Sistema LP</h1>
          <p className={styles.subtitle}>Plataforma Institucional</p>
          <Sparkles className={styles.sparkle} size={20} />
        </div>

        {/* === FORMULARIO === */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>DNI</label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="12345678"
              required
              maxLength={8}
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}>
                <LogIn size={18} />
              </div>
            ) : (
              <>
                <LogIn size={18} />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        {/* === FOOTER === */}
        <div className={styles.footer}>
          <details className={styles.details}>
            <summary className={styles.summary}>
              Credenciales de prueba
            </summary>
            <div className={styles.list}>
              <p><strong>Docente:</strong> 12345678</p>
              <p><strong>Admin Bienes:</strong> 87654321</p>
              <p><strong>Biblioteca:</strong> 11223344</p>
              <p><strong>Contraseña:</strong> 123</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;