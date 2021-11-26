import { Injectable } from '@angular/core';

import { Produto } from '../../shared/models/produto.model';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../shared/models/http-response';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  endpoint = 'produto/';

  listarTodos(): Observable<Produto[]> {
    return this.listar(this.endpoint);
  }

  inserirProduto(produto: Produto): Observable<HttpResponse> {
    return this.inserir(this.endpoint, produto);
  }

  removerProduto(id: number): Observable<HttpResponse> {
    return this.remover(`${this.endpoint}${id}`);
  }

  buscarProdutoPorId(id: number): Observable<Produto> {
    return this.buscarPorId(`${this.endpoint}${id}`);
  }

  atualizarProduto(produto: Produto): Observable<HttpResponse> {
    return this.atualizar(`${this.endpoint}`, produto);
  }
}
