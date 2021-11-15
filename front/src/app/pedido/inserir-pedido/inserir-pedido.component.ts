import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/produto/services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';

@Component({
  selector: 'app-inserir-pedido',
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.scss']
})
export class InserirPedidoComponent implements OnInit {
  produtos!: Produto[];
  constructor(private produtoService: ProdutoService) { }

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

}
