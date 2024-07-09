import { Component, Input, OnInit } from '@angular/core';
import { Enviroment } from '../../../../Enviroment';
import { ProductoDto } from '../../../../dto/Producto/ProductoDto';
import { ProductoService } from '../../../../Services/Producto/Producto.service';

@Component({
  selector: 'app-Item',
  templateUrl: './Item.component.html',
  styleUrls: ['./Item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() Producto!: ProductoDto;
  @Input() FirstFoto: string = "https://via.placeholder.com/200x200";
  Moneda : string = Enviroment.Moneda;



  constructor(private produtoServices : ProductoService) { }

  ngOnInit() {
  }

  seleccionarProducto(){
    this.produtoServices.setProductoSeleccionado(this.Producto);
    console.log(this.Producto);
  }

  getProductoService(event: any = null){
    if (event){
      event.stopPropagation();
    }
    return this.produtoServices;
  }

}
