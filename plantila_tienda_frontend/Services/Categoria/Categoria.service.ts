import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService {

  constructor(httpClient : HttpClient) {
    super(httpClient);
    this.controller = 'Categoria';
  }

  GetCategoriasHijas(categoriaId : string){
    return this.httpClient.get<any>(this.apiIp + this.controller + '/categoria/'+ categoriaId , {headers: this.getHeaders()});
  }
}
