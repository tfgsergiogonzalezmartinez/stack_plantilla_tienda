import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';
import { VentaDto } from '../../dto/VentaDto/VentaDto';
import { CrearVenta } from '../../dto/VentaDto/CrearVenta';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends BaseService {

  constructor(httpClient : HttpClient) {
    super(httpClient);
    this.controller = 'Venta';
  }


  GetVentasByUsuario(userId : string){
    return this.httpClient.get<VentaDto[]>(this.apiIp + this.controller + "/" + "GetVentasByUsuario" +"/"+ userId , {headers: this.getHeaders()});
  }

  CrearVenta(venta : CrearVenta){
    return this.httpClient.post<VentaDto>(this.apiIp + this.controller + "/" + "CrearVenta", venta , {headers: this.getHeaders()});
  }

}
