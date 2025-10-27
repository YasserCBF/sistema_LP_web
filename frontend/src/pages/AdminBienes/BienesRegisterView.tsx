// src/pages/AdminBienes/BienesRequestsView.tsx
import Layout from '../../components/Layout/Layout';
import RequestsTable from '../../components/Tables/RequestsTable';
import styles from './BienesRequestsView.module.css';

const BienesRequestsView = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Solicitudes de Bienes</h1>
        <RequestsTable type="bien" />
      </div>
    </Layout>
  );
};

export default BienesRequestsView;