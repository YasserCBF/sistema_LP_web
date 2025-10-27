// src/components/Forms/RequestForm.tsx
import { useState } from 'react';
import styles from './RequestForm.module.css';
import { useAuth } from '../../context/AuthContext';

const RequestForm = () => {
  const { user } = useAuth();
  const [tipo, setTipo] = useState<'libro' | 'bien'>('libro');
  const [itemId, setItemId] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Debes estar logueado');
      return;
    }

    const nuevaSolicitud = {
      id: Date.now(),
      usuario: { id: user.id, username: user.username },
      item_id: parseInt(itemId),
      tipo,
      estado: 'pendiente' as const,
      fecha_solicitud: new Date().toISOString(),
      motivo,
    };

    const solicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    localStorage.setItem('solicitudes', JSON.stringify([...solicitudes, nuevaSolicitud]));

    alert('Solicitud enviada con éxito');
    setItemId('');
    setMotivo('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value as 'libro' | 'bien')}>
          <option value="libro">Libro</option>
          <option value="bien">Bien</option>
        </select>
      </div>
      <div className={styles.field}>
        <label>ID del Ítem</label>
        <input
          type="number"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Motivo</label>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          rows={3}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Enviar Solicitud
      </button>
    </form>
  );
};

export default RequestForm;