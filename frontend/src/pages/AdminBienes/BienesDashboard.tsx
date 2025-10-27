// src/pages/AdminBienes/BienesDashboard.tsx
import Layout from '../../components/Layout/Layout';
import styles from './BienesDashboard.module.css';

const BienesDashboard = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1>Panel de Bienes</h1>
        <div className={styles.stats}>
          <div className={styles.card}>
            <h3>45</h3>
            <p>Bienes Totales</p>
          </div>
          <div className={styles.card}>
            <h3>8</h3>
            <p>Solicitudes Pendientes</p>
          </div>
          <div className={styles.card}>
            <h3>12</h3>
            <p>En Préstamo</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BienesDashboard;