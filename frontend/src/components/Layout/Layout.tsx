import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Layout.module.css';
import { LogOut, Home, PlusCircle, History, Package, Book } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const menu = {
    docente: [
      { path: '/docente/dashboard', label: 'Inicio', icon: Home },
      { path: '/docente/nueva-solicitud', label: 'Nueva Solicitud', icon: PlusCircle },
      { path: '/docente/historial', label: 'Historial', icon: History },
    ],
    adminb: [
      { path: '/admin-bienes/dashboard', label: 'Inicio', icon: Home },
      { path: '/admin-bienes/solicitudes', label: 'Solicitudes', icon: History },
      { path: '/admin-bienes/registrar', label: 'Registrar Bien', icon: Package },
    ],
    adminl: [
      { path: '/admin-biblioteca/dashboard', label: 'Inicio', icon: Home },
      { path: '/admin-biblioteca/solicitudes', label: 'Solicitudes', icon: History },
      { path: '/admin-biblioteca/registrar', label: 'Registrar Libro', icon: Book },
    ],
  };

  const items = menu[user.role] || [];
  const current = items.find(i => i.path === location.pathname)?.label || 'Dashboard';

  const roleTheme = user.role === 'docente' ? styles.docente :
                    user.role === 'adminb' ? styles.adminb :
                    styles.adminl;

  return (
    <div className={`${styles.layout} ${roleTheme}`}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src="/logo-colegio.png" alt="LP" className={styles.logo} />
          <h2>Sistema LP</h2>
        </div>
        <nav className={styles.nav}>
          {items.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`${styles.navItem} ${location.pathname === path ? styles.active : ''}`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>{current}</h1>
            <p className={styles.welcome}>Bienvenido, <strong>{user.name}</strong></p>
          </div>
          <button onClick={logout} className={styles.logout}>
            <LogOut size={18} />
            Salir
          </button>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;