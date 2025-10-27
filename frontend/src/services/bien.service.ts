// src/services/bien.service.ts
import type { Request } from '../types/models';

export const getSolicitudesBienes = async (): Promise<Request[]> => {
  return [
    {
      id: 201,
      usuario: { id: 1, username: 'docente' },
      item_id: 10,
      tipo: 'bien',
      estado: 'pendiente',
      fecha_solicitud: new Date().toISOString(),
      motivo: 'Para laboratorio'
    }
  ];
};

export const aprobarSolicitud = async (id: number) => {
  console.log('Aprobado:', id);
};

export const rechazarSolicitud = async (id: number) => {
  console.log('Rechazado:', id);
};