// src/pages/Docente/NewRequestView.tsx
import Layout from '../../components/Layout/Layout';
import RequestForm from '../../components/Forms/RequestForm';
import styles from './NewRequestView.module.css';

const NewRequestView = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Nueva Solicitud</h1>
        <p>Selecciona si deseas solicitar un libro o un bien.</p>
        <RequestForm />
      </div>
    </Layout>
  );
};

export default NewRequestView;