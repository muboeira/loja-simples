import { Injectable } from '@angular/core';

import { Produto } from '../../shared/models/produto.model';
import{ HttpClient, HttpHeaders} from'@angular/common/http';
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

  inserir(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(
      this.BASE_URL,
      JSON.stringify(produto),
      this.httpOptions
    );
  }
  /*remover(id: number): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(this.BASE_URL + id, this.httpOptions);
  }
  alterar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(
      this.BASE_URL + usuario.id,
      JSON.stringify(usuario),
      this.httpOptions
    );
  }*/
}
