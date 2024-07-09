import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../Services/User/User.service';
import { ProductoService } from '../../../../Services/Producto/Producto.service';
import { ProductoDto } from '../../../../dto/Producto/ProductoDto';
import { ProductoCesta } from '../../../../Interfaces/Venta/ProductoCesta';
import { CategoriaService } from '../../../../Services/Categoria/Categoria.service';
import { CategoriaDto } from '../../../../dto/Categoria/CategoriaDto';
import { CrearProductoDto } from '../../../../dto/Producto/CrearProductoDto';
import { SubirImagenesProductoDto } from '../../../../dto/Producto/SubirImagenesProductoDto';

@Component({
  selector: 'app-MainPage',
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('inputImagenes') inputImagenes! : ElementRef
  mostrarFiltros: boolean = false;
  nuevaTalla : string = "";
  nuevoColor : string = "";
  listaNuevosColores : string[] = [];
  listaNuevasTallas : string[] = [];
  nuevoNombre : string = "";
  nuevoPrecio : number = 0;
  nuevoCategoria : string = "";
  nuevoDescripcion : string = "";
  listaCategorias : CategoriaDto[] = [];
  private imagenesSeleccionadas : File[] = [];
  base64Imagenes : string[] = [];
  imagenPrincipal : string = "";

  constructor(private mainService : MainService,private cdr : ChangeDetectorRef, private userService : UserService,private productosService : ProductoService, private categoriaService: CategoriaService, private router : Router ) { }

  ngOnInit() {
    this.getCategorias();
    this.productosService.getTodosProductos();
  }

  getCategorias(){
    this.categoriaService.GetAll().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        this.cdr.detectChanges();

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getService(){
    return this.mainService;
  }

  toggleFiltros(){
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  getProductosService(){
    return this.productosService;
  }

  crearProducto(){
    if (!this.nuevoNombre || !this.nuevoPrecio || !this.nuevoCategoria || this.listaNuevasTallas.length == 0 || this.listaNuevosColores.length == 0 ) return;
    const producto : CrearProductoDto = {
      Nombre : this.nuevoNombre,
      Precio : this.nuevoPrecio,
      Categoria : this.nuevoCategoria,
      Colores : this.listaNuevosColores,
      Tallas : this.listaNuevasTallas,
      Descripcion : this.nuevoDescripcion
    }
    this.productosService.CrearProducto(producto).subscribe({
      next: (data) => {
        console.log(data);
        this.subirImagenes(data.Id);
        this.productosService.getTodosProductos();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  clickInputImagenes(){
    this.inputImagenes.nativeElement.click();
  }

  async seleccionarImagenes(event: any){
    event.stopPropagation();
    this.imagenesSeleccionadas = Array.from(event.target.files);
    this.base64Imagenes = [];
    for (const file of this.imagenesSeleccionadas) {
      const base64 = await this.convertToBase64(file);
      this.base64Imagenes.push(base64);
    }
    console.log(this.base64Imagenes);
  }

  subirImagenes(id : string =""){
    const subirImagenesProductoDto : SubirImagenesProductoDto = new SubirImagenesProductoDto();
    if ( id == "") subirImagenesProductoDto.IdProducto = this.productosService.getProductoSeleccionado()!.Id;
    if ( id != "") subirImagenesProductoDto.IdProducto = id;
    this.base64Imagenes.splice(this.base64Imagenes.indexOf(this.imagenPrincipal),1);
    subirImagenesProductoDto.Fotos = this.base64Imagenes;
    subirImagenesProductoDto.FotoPrincipal = this.imagenPrincipal;
    this.productosService.SubirImagenesProducto(subirImagenesProductoDto).subscribe({
      next: (data) => {
        this.productosService.setIsNuevoProducto(false);
        this.productosService.setProductoSeleccionado(data);
        console.log(data);
        this.productosService.getTodosProductos();
        this.imagenesSeleccionadas= [];
        this.base64Imagenes = [];
        this.imagenPrincipal = "";
      },
      error: (error) => {
        console.log(error);
      }
    });



  }



  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  addProducto(){
    if (!this.getProductosService().getTallaSeleccionada() || !this.getProductosService().getColorSeleccionado()) return;
    const ProductoCesta : ProductoCesta = {
      Producto : this.getProductosService().getProductoSeleccionado()!.Nombre,
      Talla : this.getProductosService().getTallaSeleccionada(),
      Color : this.getProductosService().getColorSeleccionado(),
      Precio : this.getProductosService().getProductoSeleccionado()!.Precio,
      FotoPrincipal : this.getProductosService().getProductoSeleccionado()!.FotoPrincipal
    }

    this.productosService.addProductoCesta(ProductoCesta);
    this.productosService.setProductoSeleccionado(null);
    this.productosService.setTallaSeleccionada("");
    this.productosService.setColorSeleccionado("");
  }

  addTalla(){
    if (!this.nuevaTalla) return;
    this.listaNuevasTallas.push(this.nuevaTalla);
    this.nuevaTalla = "";
  }

  addColor(){
    if (!this.nuevoColor) return;
    this.listaNuevosColores.push(this.nuevoColor);
    this.nuevoColor = "";
  }

  getUserService(){
    return this.userService;
  }

  salirProductorSeleccionado(){
    this.clearImagenes();
    this.productosService.setProductoSeleccionado(null);
  }

  salirNuevoProducto(){
    this.clearImagenes();
    this.productosService.setIsNuevoProducto(false);
  }

  clearImagenes(){
    this.imagenesSeleccionadas = [];
    this.base64Imagenes = [];
    this.imagenPrincipal = "";
  }



}



