
export type Role = 'docente' | 'admin_bienes' | 'admin_biblioteca';

export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  disponible: boolean;
}

export interface Asset {
  id: number;
  nombre: string;
  codigo: string;
  categoria: string;
  disponible: boolean;
}

export type RequestStatus = 'pendiente' | 'aprobado' | 'rechazado' | 'devuelto';

export interface Request {
  id: number;
  usuario: Pick<User, 'id' | 'username'>;
  item_id: number;
  tipo: 'libro' | 'bien';
  estado: RequestStatus;
  fecha_solicitud: string;
  motivo?: string;
}