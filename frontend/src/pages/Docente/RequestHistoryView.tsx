// src/pages/Docente/RequestHistoryView.tsx
import Layout from '../../components/Layout/Layout';
import MyRequestsTable from '../../components/Tables/MyRequestsTable';
import styles from './RequestHistoryView.module.css';

const RequestHistoryView = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Historial de Solicitudes</h1>
        <MyRequestsTable />
      </div>
    </Layout>
  );
};

export default RequestHistoryView;