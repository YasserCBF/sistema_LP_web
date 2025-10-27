// src/pages/AdminBiblioteca/LibrosRequestsView.tsx
import Layout from '../../components/Layout/Layout';
import RequestsTable from '../../components/Tables/RequestsTable';
import styles from './LibrosRequestsView.module.css';

const LibrosRequestsView = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Solicitudes de Préstamo</h1>
        <RequestsTable type="libro" />
      </div>
    </Layout>
  );
};

export default LibrosRequestsView;