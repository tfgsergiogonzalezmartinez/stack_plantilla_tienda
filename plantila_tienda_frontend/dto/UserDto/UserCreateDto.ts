import { Direccion } from "./Direccion";

export interface UserCreateDto {
  Email: string;
  Password: string;
  Nombre: string;
  Apellido1: string;
  Apellido2: string;
  FechaNacimiento: Date;
  telefono?: string;
  direccionUsuario?: Direccion;
}

