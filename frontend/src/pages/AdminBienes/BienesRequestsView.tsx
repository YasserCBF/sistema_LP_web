// src/pages/AdminBienes/BienesRegisterView.tsx
import Layout from '../../components/Layout/Layout';
import ItemRegisterForm from '../../components/Forms/ItemRegisterForm';
import styles from './BienesRegisterView.module.css';

const BienesRegisterView = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Registrar Nuevo Bien</h1>
        <ItemRegisterForm type="bien" />
      </div>
    </Layout>
  );
};

export default BienesRegisterView;