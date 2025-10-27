// src/components/Tables/MyRequestsTable.tsx
import { useEffect, useState } from 'react';
import styles from './MyRequestsTable.module.css';
import type { Request } from '../../types/models';
import { useAuth } from '../../context/AuthContext';

const MyRequestsTable = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // SIMULACIÓN LOCAL: Lee solicitudes del usuario actual
    const fetchData = () => {
      try {
        const allSolicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
        const myRequests = allSolicitudes.filter((s: Request) => s.usuario.id === user.id);
        setSolicitudes(myRequests);
      } catch (error) {
        console.error('Error leyendo historial:', error);
        setSolicitudes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p>Cargando historial...</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Ítem</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.empty}>No tienes solicitudes</td>
            </tr>
          ) : (
            solicitudes.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.tipo}</td>
                <td>{s.item_id}</td>
                <td>
                  <span className={`${styles.estado} ${styles[s.estado]}`}>
                    {s.estado}
                  </span>
                </td>
                <td>{new Date(s.fecha_solicitud).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequestsTable;