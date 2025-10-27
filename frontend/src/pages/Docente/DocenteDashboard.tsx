// src/pages/Docente/DocenteDashboard.tsx
import Layout from '../../components/Layout/Layout';
import styles from './DocenteDashboard.module.css';

const DocenteDashboard = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1>Bienvenido, Docente</h1>
        <p>Gestiona tus solicitudes de libros y bienes.</p>

        <div className={styles.stats}>
          <div className={styles.card}>
            <h3>3</h3>
            <p>Solicitudes Pendientes</p>
          </div>
          <div className={styles.card}>
            <h3>5</h3>
            <p>Préstamos Activos</p>
          </div>
          <div className={styles.card}>
            <h3>12</h3>
            <p>Historial Total</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocenteDashboard;