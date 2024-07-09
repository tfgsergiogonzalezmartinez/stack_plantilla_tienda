import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { VentaDto } from '../../../../dto/VentaDto/VentaDto';
import { VentaService } from '../../../../Services/Venta/Venta.service';
import { UserService } from '../../../../Services/User/User.service';

@Component({
  selector: 'app-VentasPage',
  templateUrl: './VentasPage.component.html',
  styleUrls: ['./VentasPage.component.css']
})
export class VentasPageComponent implements OnInit {
  columns: string[] = [
    'Usuario',
    'Productos',
    'Fecha',
    'Total',
  ];

  rowSelected: any | null = null;
  datosTabla: VentaDto[] = [];
  constructor(private mainService : MainService, private userService : UserService, private ventaService : VentaService) { }

  ngOnInit() {

    if (this.userService.isAdmin()){
      this.ventaService.GetAll().subscribe({
        next: (data) => {
          this.datosTabla = data;
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
      return
    }else{
      this.ventaService.GetVentasByUsuario(sessionStorage.getItem("Id")!).subscribe({
        next: (data) => {
          this.datosTabla = data;
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  public clickRow(row : any){
    // this.tableService.setRowSelected(row);
    console.log(row);
  }

  getService(){
    return this.mainService;
  }

  getUserService(){
    return this.userService;
  }

}
