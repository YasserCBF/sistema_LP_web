// src/pages/AdminBiblioteca/BibliotecaDashboard.tsx
import Layout from '../../components/Layout/Layout';
import styles from './BibliotecaDashboard.module.css';

const BibliotecaDashboard = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1>Panel de Biblioteca</h1>
        <div className={styles.stats}>
          <div className={styles.card}>
            <h3>1,240</h3>
            <p>Libros en Acervo</p>
          </div>
          <div className={styles.card}>
            <h3>18</h3>
            <p>Solicitudes Pendientes</p>
          </div>
          <div className={styles.card}>
            <h3>42</h3>
            <p>En Préstamo</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BibliotecaDashboard;