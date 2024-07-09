import { EntidadGetDto } from "../EntidadGetDto";
import { VentaProducto } from "./VentaProducto";

export interface VentaDto extends EntidadGetDto {
  Usuario: string;
  Productos: VentaProducto[];
  Total: number;
}
