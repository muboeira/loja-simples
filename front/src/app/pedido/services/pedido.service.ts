import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { HttpResponse } from '../../shared/models/http-response';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private httpClient: HttpClient) { }
  BASE_URL = "http://localhost:8080/pedido/";
  httpOptions= {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  listarTodos(): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.BASE_URL,this.httpOptions);
  }

  inserir(pedido: Pedido): Observable<HttpResponse> {
    console.log(pedido);
    return this.httpClient.post<HttpResponse>(
      this.BASE_URL,
      JSON.stringify(pedido),
      this.httpOptions
    );
  }

  remover(id: number): Observable<HttpResponse> {
    return this.httpClient.delete<HttpResponse>(
      this.BASE_URL + id,
      this.httpOptions
    );
  }
}
