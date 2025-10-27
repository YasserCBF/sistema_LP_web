// src/pages/AdminBiblioteca/LibroRegisterView.tsx
import Layout from '../../components/Layout/Layout';
import ItemRegisterForm from '../../components/Forms/ItemRegisterForm';
import styles from './LibroRegisterView.module.css';

const LibroRegisterView = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Registrar Nuevo Libro</h1>
        <ItemRegisterForm type="libro" />
      </div>
    </Layout>
  );
};

export default LibroRegisterView;