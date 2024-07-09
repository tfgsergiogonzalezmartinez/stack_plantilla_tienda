import { EntidadGetDto } from "../EntidadGetDto";
import { Direccion } from "./Direccion";

export interface UserGetDto extends EntidadGetDto {
  Email : string;
  Nombre : string;
  Apellido1: string;
  Apellido2: string;
  FechaNamimiento: Date;
  Rol : string;
  Telefono? : string;
  DireccionUsuario? : Direccion;
}
