import { Component, OnInit } from '@angular/core';

import { ProdutoService } from '../services/produto.service';
import { Produto } from '../../shared/models/produto.model';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.scss'],
})
export class ListarProdutoComponent implements OnInit {
  produtos!: Produto[];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtos = this.listarTodos();
  }

  listarTodos(): Produto[] {
    this.produtoService.listarTodos().subscribe({
      next: (data: Produto[]) => {
        if (data == null) {
          this.produtos = [];
        } else {
          this.produtos = data;
        }
      }
    });

    return this.produtos;
  }

  /*excluir($event: any, produto: Produto): void {
    $event.preventDefault();
    if (
      confirm(
        'Deseja realmente remover o produto "' + produto.descricao + '"?'
      ) &&
      produto.id
    ) {
      this.produtoService.remover(produto.id);
      this.produtos = this.listarTodos();
    }
  }*/
}
