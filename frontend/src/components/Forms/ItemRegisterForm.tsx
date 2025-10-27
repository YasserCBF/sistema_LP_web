// src/components/Forms/ItemRegisterForm.tsx
import { useState } from 'react';
import styles from './ItemRegisterForm.module.css';

interface Props {
  type: 'libro' | 'bien';
}

const ItemRegisterForm = ({ type }: Props) => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    nombre: '',
    codigo: '',
    categoria: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // GUARDAR EN localStorage (simula base de datos)
    const key = type === 'libro' ? 'libros' : 'bienes';
    const stored = JSON.parse(localStorage.getItem(key) || '[]');

    const newItem = {
      id: Date.now(),
      ...(type === 'libro'
        ? {
            titulo: formData.titulo,
            autor: formData.autor,
            isbn: formData.isbn,
            disponible: true,
          }
        : {
            nombre: formData.nombre,
            codigo: formData.codigo,
            categoria: formData.categoria,
            disponible: true,
          }),
    };

    localStorage.setItem(key, JSON.stringify([...stored, newItem]));
    alert(`${type === 'libro' ? 'Libro' : 'Bien'} registrado con éxito`);

    // Limpiar formulario
    setFormData({
      titulo: '', autor: '', isbn: '',
      nombre: '', codigo: '', categoria: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {type === 'libro' ? (
        <>
          <div className={styles.field}>
            <label>Título</label>
            <input name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Autor</label>
            <input name="autor" value={formData.autor} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>ISBN</label>
            <input name="isbn" value={formData.isbn} onChange={handleChange} required />
          </div>
        </>
      ) : (
        <>
          <div className={styles.field}>
            <label>Nombre del Bien</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Código</label>
            <input name="codigo" value={formData.codigo} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Categoría</label>
            <input name="categoria" value={formData.categoria} onChange={handleChange} required />
          </div>
        </>
      )}
      <button type="submit" className={styles.button}>
        Registrar {type === 'libro' ? 'Libro' : 'Bien'}
      </button>
    </form>
  );
};

export default ItemRegisterForm;