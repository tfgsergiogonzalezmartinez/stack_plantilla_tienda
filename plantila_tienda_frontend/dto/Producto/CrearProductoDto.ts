export class CrearProductoDto {
  public Nombre! : string;
  public Descripcion! : string;
  public Precio! : number;
  public Stock? : number;
  public Colores!: string[];
  public Tallas! : string[];
  public Categoria! : string;
  public FotoPrincipal? : string;
  public Fotos? : string[];
}
