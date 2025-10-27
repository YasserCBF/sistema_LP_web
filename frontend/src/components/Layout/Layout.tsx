// src/components/Layout/Layout.tsx
import type { ReactNode } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode; // ← Ya no necesitas importarlo si usas type
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const menuItems: Record<string, { path: string; label: string }[]> = {
    docente: [
      { path: '/docente/dashboard', label: 'Dashboard' },
      { path: '/docente/nueva-solicitud', label: 'Nueva Solicitud' },
      { path: '/docente/historial', label: 'Historial' },
    ],
    admin_bienes: [
      { path: '/admin-bienes/dashboard', label: 'Dashboard' },
      { path: '/admin-bienes/solicitudes', label: 'Solicitudes' },
      { path: '/admin-bienes/registrar', label: 'Registrar Bien' },
    ],
    admin_biblioteca: [
      { path: '/admin-biblioteca/dashboard', label: 'Dashboard' },
      { path: '/admin-biblioteca/solicitudes', label: 'Solicitudes' },
      { path: '/admin-biblioteca/registrar', label: 'Registrar Libro' },
    ],
  };

  const items = menuItems[user.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Sistema de Gestión</h1>
        <div className={styles.userInfo}>
          <span>{user.username} ({user.role.replace('_', ' ')})</span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </header>
      <div className={styles.main}>
        <aside className={styles.sidebar}>
          <ul>
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? styles.active : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;