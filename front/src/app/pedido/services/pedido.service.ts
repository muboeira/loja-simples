import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/shared/models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private httpClient: HttpClient) { }
  BASE_URL = "http://localhost:8080/pedido";
  httpOptions= {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  listarTodos(): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.BASE_URL,this.httpOptions);
  }

  inserir(pedido: Pedido): Observable<Pedido> {
    console.log(JSON.stringify(pedido));
    return this.httpClient.post<Pedido>(
      this.BASE_URL,
      JSON.stringify(pedido),
      this.httpOptions
    );
  }
}
