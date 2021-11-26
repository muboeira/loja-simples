import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { HttpResponse } from '../../shared/models/http-response';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  endpoint = 'pedido/';

  listarTodos(): Observable<Pedido[]> {
    return this.listar(this.endpoint);
  }

  inserirPedido(pedido: Pedido): Observable<HttpResponse> {
    return this.inserir(this.endpoint, pedido);
  }

  removerPedido(id: number): Observable<HttpResponse> {
    return this.remover(`${this.endpoint}${id}`);
  }

  buscarPedidoPorId(id: number): Observable<Pedido> {
    return this.buscarPorId(`${this.endpoint}${id}`);
  }

  atualizarPedido(pedido: Pedido): Observable<HttpResponse> {
    return this.atualizar(`${this.endpoint}`, pedido);
  }
}
