import { Injectable } from '@angular/core';

import { Produto } from '../../shared/models/produto.model';
import { HttpClient, HttpHeaders} from'@angular/common/http';
import { HttpResponse } from '../../shared/models/http-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) {}

  BASE_URL = "http://localhost:8080/produto/";
  httpOptions= {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  listarTodos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.BASE_URL,this.httpOptions);
  }

  inserir(produto: Produto): Observable<HttpResponse> {
    return this.httpClient.post<HttpResponse>(
      this.BASE_URL,
      JSON.stringify(produto),
      this.httpOptions
    );
  }

  remover(id: number): Observable<HttpResponse> {
    return this.httpClient.delete<HttpResponse>(this.BASE_URL + id, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(this.BASE_URL + id,this.httpOptions);
  }
  
  atualizar(produto: Produto): Observable<HttpResponse> {
    return this.httpClient.put<HttpResponse>(
      this.BASE_URL,
      JSON.stringify(produto),
      this.httpOptions
    );
  }
}
