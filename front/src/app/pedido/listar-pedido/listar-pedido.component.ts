import { PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.scss']
})
export class ListarPedidoComponent implements OnInit {
  pedidos!: Pedido[];
  totalPedidos!: Number;

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
          this.totalPedidos = data.length; 
        }
      },
      error: (erro: any) => {
        alert(erro.message)
      }
    });

    return this.pedidos;
  }

  getInfoCliente(cliente?: Cliente): String {
    return new Pedido().getInfoCliente(cliente);
  }

}
