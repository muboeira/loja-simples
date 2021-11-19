import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProdutoService } from '../services/produto.service';
import { Produto } from '../../shared/models/produto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.scss'],
})
export class ListarProdutoComponent implements OnInit {
  produtos!: Produto[];
  totalProdutos!: Number;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

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
          this.totalProdutos = data.length; 
        }
      }
    });

    return this.produtos;
  }

  remover($event: any, produto: Produto): void {
    $event.preventDefault();
    if (
      confirm(
        'Deseja realmente remover o produto "' + produto.descricao + '"?'
      ) &&
      produto.id
    ) {
      this.produtoService.remover(produto.id).subscribe({
        next: (data: Produto) => {
          //this.router.navigate(['/produtos']);
          this.listarTodos();
        }
      });   
    }
  }
}
