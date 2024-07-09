import { Entidad } from "../Entidad";

export interface ProductoDto extends Entidad {
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Fotos: string[];
  FotoPrincipal: string;
  Categoria : string;
  Tallas: string[];
  Colores: string[];
  TallaSeleccionada?: boolean;
  ColorSeleccionada?: boolean;
}
