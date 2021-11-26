import { PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { HttpResponse } from '../../shared/models/http-response';
import { ItemPedido } from 'src/app/shared/models/itemPedido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.scss'],
})
export class ListarPedidoComponent implements OnInit {
  pedidos!: Pedido[];
  totalPedidos!: Number;
  cpfPesquisado: any;
  pedidosOriginais!: Pedido[];

  constructor(private pedidoService: PedidoService) {}

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
          this.pedidosOriginais = data;
          this.totalPedidos = data.length;
        }
      },
      error: (erro: any) => {
        alert(erro.error.message);
      },
    });

    return this.pedidos;
  }

  remover($event: any, pedido: Pedido): void {
    $event.preventDefault();
    if (
      confirm('Deseja realmente remover o pedido id "' + pedido.id + '"?') &&
      pedido.id
    ) {
      this.pedidoService.removerPedido(pedido.id).subscribe({
        next: (data: HttpResponse) => {
          if (data.status == 'OK') {
            this.listarTodos();
          }
        },
        error: (erro: any) => {
          alert(erro.error.message);
        },
      });
    }
  }

  getInfoCliente(cliente?: Cliente): String {
    return new Pedido().getInfoCliente(cliente);
  }

  getInfoItemPedido(item?: ItemPedido): string {
    return new Pedido().getInfoItemPedido(item);
  }

  getInfoItensPedido(itens?: ItemPedido[]) {
    let infos = new Pedido().getInfoItensPedido(itens);
    Swal.fire(infos);
  }

  pesquisarCPF(){
    let cpf = this.cpfPesquisado;
    if (cpf == '' || cpf == null) {
      this.pedidos = this.pedidosOriginais;
    } else {
      this.pedidos = this.pedidosOriginais.filter( pedido => {
        return pedido.cliente?.cpf == cpf; 
      })
    }
    this.totalPedidos = this.pedidos.length;
  }
}
