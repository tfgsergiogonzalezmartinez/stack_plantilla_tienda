import { EntidadGetDto } from "../EntidadGetDto";

export interface CategoriaDto extends EntidadGetDto {
  Nombre : string;
  CategoriaPadre? : string;
  SubCategorias? : CategoriaDto[];
}
