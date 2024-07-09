import { ElementRef, Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';
import { ProductoDto } from '../../dto/Producto/ProductoDto';
import { VentaDto } from '../../dto/VentaDto/VentaDto';
import { ProductoCesta } from '../../Interfaces/Venta/ProductoCesta';
import { CrearProductoDto } from '../../dto/Producto/CrearProductoDto';
import { SubirImagenesProductoDto } from '../../dto/Producto/SubirImagenesProductoDto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService {
  private CategoriaActiva! : string;
  private listaProductos : ProductoDto[] = [];
  private listaProductosCesta : ProductoCesta[] = [];
  private productoSeleccionado! : ProductoDto | null;

  private tallaSeleccionada! : string;
  private colorSeleccionado! : string;

  private CestaRef! : ElementRef;

  private isNuevoProducto : boolean = false;

  private fotoPrincipal : string = "https://via.placeholder.com/200x200";

  constructor(httpClient : HttpClient) {
    super(httpClient);
    this.controller = 'Producto';
  }
  GetProductos(){
    return this.httpClient.get<ProductoDto[]>(this.apiIp + this.controller , {headers: this.getHeaders()});
  }

  GetProductosByCategoria(categoriaId : string){
    return this.httpClient.get<ProductoDto[]>(this.apiIp + this.controller + '/categoria/'+ categoriaId , {headers: this.getHeaders()});
  }
  GetProductosByCategoriaFilterPrecioAsc(categoriaId : string){
    return this.httpClient.get<ProductoDto[]>(this.apiIp + this.controller + '/categoria/'+ categoriaId +'/precio/asc' , {headers: this.getHeaders()});
  }
  GetProductosByCategoriaFilterPrecioDesc(categoriaId : string){
    return this.httpClient.get<ProductoDto[]>(this.apiIp + this.controller + '/categoria/'+ categoriaId +'/precio/desc' , {headers: this.getHeaders()});
  }
  GetProductosFilterPrecioAsc(){
    return this.httpClient.get<ProductoDto[]>(this.apiIp + this.controller + '/precio/asc' , {headers: this.getHeaders()});
  }
  GetProductosFilterPrecioDesc(){
    return this.httpClient.get<ProductoDto[]>(this.apiIp + this.controller + '/precio/desc' , {headers: this.getHeaders()});
  }

  CrearProducto(producto : CrearProductoDto){
    return this.httpClient.post<any>(this.apiIp + this.controller + "/CrearProducto", producto , {headers: this.getHeaders()});
  }

  SubirImagenesProducto(subirImagenesProductoDto : SubirImagenesProductoDto){
    return this.httpClient.post<any>(this.apiIp + this.controller + "/subirImagenes", subirImagenesProductoDto , {headers: this.getHeaders()});
  }

  getCatergoriaActiva(){
    return this.CategoriaActiva;
  }
  setCategoriaActiva(categoria : string){
    this.CategoriaActiva = categoria;
    this.GetProductosByCategoria(categoria).subscribe({
      next: (data) => {
        if(data.length == 0) return;
        this.setListaProductos(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getListaProductos(){
    return this.listaProductos;
  }

  setListaProductos(lista : ProductoDto[]){
    this.listaProductos = lista;
  }

  getTodosProductos(){
    this.listaProductos = [];
    this.GetAll().subscribe({
      next: (data) => {
        this.listaProductos = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getListaProductosCesta(){
    return this.listaProductosCesta;
  }
  setListaProductosCesta(lista : ProductoCesta[]){
    this.listaProductosCesta = lista;
  }
  addProductoCesta(producto : ProductoCesta){
    this.listaProductosCesta.push(producto);
    this.CestaRef.nativeElement.scrollIntoView({behavior: "smooth"});
    this.CestaRef.nativeElement.scrollTop = this.CestaRef.nativeElement.scrollHeight;
  }
  removeProductoCesta(indexPrducto : number){
    this.listaProductosCesta = this.listaProductosCesta.filter((value, index) => index != indexPrducto);
  }

  getTotal(){
    let total = 0;
    for (const prod of this.listaProductosCesta){
      total += prod.Precio;
    }
    return total;
  }

  getProductoSeleccionado(){
    return this.productoSeleccionado;
  }

  setProductoSeleccionado(producto : ProductoDto | null){
    this.productoSeleccionado = producto;
    this.fotoPrincipal = producto!.FotoPrincipal;
  }

  setFotoPrincipalProducto(foto: string) {
    if (this.fotoPrincipal) {
      this.productoSeleccionado!.Fotos.push(this.fotoPrincipal);

      const index = this.productoSeleccionado!.Fotos.indexOf(foto);
      if (index !== -1) {
        this.productoSeleccionado!.Fotos.splice(index, 1);
      }
    }

    this.fotoPrincipal = foto;
    this.productoSeleccionado!.FotoPrincipal = foto;
  }



  filtrarPrecioAsc(){
    this.GetProductosFilterPrecioAsc().subscribe({
      next: (data) => {
        this.setListaProductos(data);

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  setCategoria(categoria : string){
    this.CategoriaActiva = categoria;
  }
  filtrarPrecioDesc(){
    this.GetProductosFilterPrecioDesc().subscribe({
      next: (data) => {
        this.setListaProductos(data);

      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  filtrarPrecioAscCategoria(categoriaId : string){
    this.GetProductosByCategoriaFilterPrecioAsc(categoriaId).subscribe({
      next: (data) => {
        this.setListaProductos(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  filtrarPrecioDescCategoria(categoriaId : string){
    this.GetProductosByCategoriaFilterPrecioDesc(categoriaId).subscribe({
      next: (data) => {
        this.setListaProductos(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  activarFiltrarAsc(){
    if (this.getCatergoriaActiva() == ""){
      this.filtrarPrecioAsc();
    }else{
      this.filtrarPrecioAscCategoria(this.getCatergoriaActiva());
    }
  }

  activarFiltrarDesc(){
    if (this.getCatergoriaActiva() == ""){
      this.filtrarPrecioDesc();
    }else{
      this.filtrarPrecioDescCategoria(this.getCatergoriaActiva());
    }
  }

  getCestaRef(){
    return this.CestaRef;
  }
  setCestaRef(cesta : ElementRef){
    this.CestaRef = cesta;
  }

  //Datos del Producto

  getColorSeleccionado(){
    return this.colorSeleccionado;
  }
  getTallaSeleccionada(){
    return this.tallaSeleccionada;
  }
  setColorSeleccionado(color : string){
    this.colorSeleccionado = color;
  }
  setTallaSeleccionada(talla : string){
    this.tallaSeleccionada = talla;
  }

  getIsNuevoProducto(){
    return this.isNuevoProducto;
  }
  setIsNuevoProducto(isNuevo : boolean){
    this.isNuevoProducto = isNuevo;
  }

  getFotoPrincipal(){
    return this.fotoPrincipal;
  }






}
