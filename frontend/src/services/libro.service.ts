// src/services/libro.service.ts
import type { Book, Request } from '../types/models';

export const getLibros = async (): Promise<Book[]> => {
  return [
    { id: 1, titulo: 'El Principito', autor: 'Saint-Exupéry', isbn: '123456', disponible: true },
    { id: 2, titulo: '1984', autor: 'Orwell', isbn: '789012', disponible: false },
  ];
};

export const crearLibro = async (data: Partial<Book>): Promise<Book> => {
  return { id: Date.now(), ...data } as Book;
};

export const getSolicitudesLibros = async (): Promise<Request[]> => {
  return [
    {
      id: 101,
      usuario: { id: 1, username: 'docente' },
      item_id: 1,
      tipo: 'libro',
      estado: 'pendiente',
      fecha_solicitud: new Date().toISOString(),
      motivo: 'Para clase de literatura'
    }
  ];
};