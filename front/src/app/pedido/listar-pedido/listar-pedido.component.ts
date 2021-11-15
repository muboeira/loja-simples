import { PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.scss']
})
export class ListarPedidoComponent implements OnInit {
  pedidos!: Pedido[];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidos = this.listarTodos();
  }

  listarTodos(): Pedido[] {
    this.pedidoService.listarTodos().subscribe({
      next: (data: Pedido[]) => {
        if (data == null) {
          this.pedidos = [];
        } else {
          this.pedidos = data;
        }
      }
    });

    return this.pedidos;
  }

}
