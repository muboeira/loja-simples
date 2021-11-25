import { Injectable } from '@angular/core';

import { Cliente } from '../../shared/models/cliente.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '../../shared/models/http-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private httpClient: HttpClient) {}

  BASE_URL = 'http://localhost:8080/cliente/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  listarTodos(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.BASE_URL, this.httpOptions);
  }

  inserir(cliente: Cliente): Observable<HttpResponse> {
    return this.httpClient.post<HttpResponse>(
      this.BASE_URL,
      JSON.stringify(cliente),
      this.httpOptions
    );
  }

  remover(id: number): Observable<HttpResponse> {
    return this.httpClient.delete<HttpResponse>(
      this.BASE_URL + id,
      this.httpOptions
    );
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.BASE_URL + id, this.httpOptions);
  }

  atualizar(cliente: Cliente): Observable<HttpResponse> {
    return this.httpClient.put<HttpResponse>(
      this.BASE_URL,
      JSON.stringify(cliente),
      this.httpOptions
    );
  }
}
