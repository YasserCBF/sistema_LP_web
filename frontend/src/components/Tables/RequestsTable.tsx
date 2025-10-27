// src/components/Tables/RequestsTable.tsx
import { useEffect, useState } from 'react';
import styles from './RequestsTable.module.css';
import type { Request } from '../../types/models';

interface Props {
  type: 'libro' | 'bien';
}

const RequestsTable = ({ type }: Props) => {
  const [solicitudes, setSolicitudes] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SIMULACIÓN LOCAL: Lee de localStorage (0ms)
    const fetchData = () => {
      try {
        const allSolicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
        // Filtra por tipo y pendientes
        const data = allSolicitudes.filter((s: Request) => 
          s.tipo === type && s.estado === 'pendiente'
        );
        setSolicitudes(data);
      } catch (error) {
        console.error('Error leyendo solicitudes:', error);
        setSolicitudes([]); // Datos vacíos si falla
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const handleAction = (id: number, action: 'aprobado' | 'rechazado') => {
    // SIMULACIÓN LOCAL: Actualiza localStorage
    const allSolicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    const updated = allSolicitudes.map((s: Request) => 
      s.id === id ? { ...s, estado: action } : s
    );
    localStorage.setItem('solicitudes', JSON.stringify(updated));
    
    // Actualiza estado local
    setSolicitudes(prev => prev.filter(s => s.id !== id));
    
    alert(`${action === 'aprobado' ? 'Aprobado' : 'Rechazado'}!`);
  };

  if (loading) return <p>Cargando solicitudes...</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Ítem ID</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.empty}>No hay solicitudes pendientes</td>
            </tr>
          ) : (
            solicitudes.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.usuario.username}</td>
                <td>{s.item_id}</td>
                <td>{s.motivo || 'N/A'}</td>
                <td>{new Date(s.fecha_solicitud).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleAction(s.id, 'aprobado')} 
                    className={styles.approve}
                  >
                    Aprobar
                  </button>
                  <button 
                    onClick={() => handleAction(s.id, 'rechazado')} 
                    className={styles.reject}
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;