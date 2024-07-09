import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../Services/Categoria/Categoria.service';
import { CategoriaDto } from '../../../../dto/Categoria/CategoriaDto';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../Services/Producto/Producto.service';

@Component({
  selector: 'app-SubHeader',
  templateUrl: './SubHeader.component.html',
  styleUrls: ['./SubHeader.component.css']
})
export class SubHeaderComponent implements OnInit {
  showCategorias : boolean = false;
  listaCategorias : CategoriaDto[] = [];
  categoriaSeleccionada! : CategoriaDto;


  constructor(private categoriaService : CategoriaService, private productosService: ProductoService, private router: Router) { }

  goTo(ruta:string){
    this.router.navigate([ruta]);
  }

  CargarCategorias(){
    let lista : CategoriaDto[] = [];
    this.categoriaService.GetAll().subscribe({
      next: (data) => {
        lista = data;
        for(const cat of lista){
          if (!cat.CategoriaPadre){
            this.listaCategorias.push(cat);
          }
        }
      for (const padre of this.listaCategorias){
          for (const hijo of lista){
            if (hijo.CategoriaPadre == padre.Nombre){
              if (!padre.CategoriaPadre) {
                padre.SubCategorias = [];
                padre.SubCategorias!.push(hijo);
              }else{
                padre.SubCategorias!.push(hijo);
              }
            }
          }
        }
        console.log(data);
        console.log(this.listaCategorias);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  seleccionarCategoria(categoria: CategoriaDto | null = null){
    if (!categoria){
      this.productosService.getTodosProductos();
      this.productosService.setCategoriaActiva("");
      this.showCategorias = false;
      return;
    }

    this.categoriaSeleccionada = categoria;
    if(!categoria.SubCategorias){
      this.productosService.setCategoriaActiva(categoria.Nombre);
      this.showCategorias = false;

    }else{
      this.productosService.setCategoriaActiva(categoria.Nombre);
    }

  }


  ngOnInit() {
    this.CargarCategorias();
  }
  toggleCategorias(){
    this.router.navigate(['/']);
    this.showCategorias = !this.showCategorias;
  }

  getProductoService(){
    return this.productosService;
  }

}
