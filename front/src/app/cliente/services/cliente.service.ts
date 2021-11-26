import { Injectable } from '@angular/core';

import { Cliente } from '../../shared/models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../shared/models/http-response';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  endpoint = 'cliente/';

  listarTodos(): Observable<Cliente[]> {
    return this.listar(this.endpoint);
  }

  inserirCliente(cliente: Cliente): Observable<HttpResponse> {
    return this.inserir(this.endpoint, cliente);
  }

  removerCliente(id: number): Observable<HttpResponse> {
    return this.remover(`${this.endpoint}${id}`);
  }

  buscarClientePorId(id: number): Observable<Cliente> {
    return this.buscarPorId(`${this.endpoint}${id}`);
  }

  atualizarCliente(cliente: Cliente): Observable<HttpResponse> {
    return this.atualizar(`${this.endpoint}${cliente.id}`, cliente);
  }
}
