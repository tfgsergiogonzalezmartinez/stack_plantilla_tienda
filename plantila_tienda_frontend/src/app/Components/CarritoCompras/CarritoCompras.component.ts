import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Enviroment } from '../../../../Enviroment';
import { ProductoService } from '../../../../Services/Producto/Producto.service';
import { VentaDto } from '../../../../dto/VentaDto/VentaDto';
import { VentaProducto } from '../../../../dto/VentaDto/VentaProducto';
import { CrearVenta } from '../../../../dto/VentaDto/CrearVenta';
import { VentaService } from '../../../../Services/Venta/Venta.service';
@Component({
  selector: 'app-CarritoCompras',
  templateUrl: './CarritoCompras.component.html',
  styleUrls: ['./CarritoCompras.component.css']
})
export class CarritoComprasComponent implements OnInit, AfterViewInit {
  @ViewChild('cesta') cestaRef!: ElementRef
  imgProducto = "https://via.placeholder.com/50x50";
  nombreProducto : string = "Producto";
  precioProducto : number = 200;
  Moneda : string = Enviroment.Moneda;

  constructor(private productosService : ProductoService, private ventaService : VentaService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.productosService.setCestaRef(this.cestaRef);
  }

  getProductosService(){
    return this.productosService;
  }

  pagar(){

    const venta : CrearVenta = new CrearVenta();
    for(const producto of this.productosService.getListaProductosCesta()){
      let ventaProducto : VentaProducto = {
        Color : producto.Color,
        Talla : producto.Talla,
        Producto : producto.Producto,
        Precio : producto.Precio
      }
      venta.Usuario = sessionStorage.getItem("Id")!;
      venta.Productos.push(ventaProducto);
      venta.Total += producto.Precio;

    }

    this.ventaService.CrearVenta(venta).subscribe({
      next: (data) => {
        console.log(data);
        this.productosService.setListaProductosCesta([]);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}
