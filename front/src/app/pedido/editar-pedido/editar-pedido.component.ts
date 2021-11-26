import { ItemPedido } from './../../shared/models/itemPedido';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { HttpResponse } from 'src/app/shared/models/http-response';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { PedidoService } from '../services/pedido.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { ProdutoService } from 'src/app/produto/services/produto.service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss'],
})
export class EditarPedidoComponent implements OnInit {
  @ViewChild('formPedido') formPedido!: NgForm;

  produtos!: Produto[];
  clientes!: Cliente[];
  clientesOriginais!: Cliente[];
  itensPedidos: ItemPedido[] = [];
  pedido: Pedido = new Pedido();
  itemSelecionado: ItemPedido = new ItemPedido();
  totalItens = 0;
  cpfPesquisado: any;
  dataPreenchida: any;
  errorMessage!: String;
  selectedDate: any;

  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private routerParams: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarPedido();
    this.produtos = this.listarTodosProdutos();
    this.clientes = this.listarTodosClientes();
  }

  buscarPedido(): void {
    const id = +this.routerParams.snapshot.params['pedidoId'];

    this.pedidoService.buscarPedidoPorId(id).subscribe({
      next: (data: Pedido | undefined) => {
        if (data == undefined) {
          this.router.navigate(['/pedidos']);
        } else {
          this.pedido = data;
          this.dataPreenchida = this.pedido.data;
          this.itensPedidos = this.pedido.itensPedido!;
          this.totalItens = this.pedido.itensPedido!.length;
        }
      },
    });
  }

  listarTodosProdutos(): Produto[] {
    this.produtoService.listarTodos().subscribe({
      next: (data: Produto[]) => {
        if (data == null) {
          this.produtos = [];
        } else {
          this.produtos = data;
        }
      },
    });

    return this.produtos;
  }

  listarTodosClientes(): Cliente[] {
    this.clienteService.listarTodos().subscribe({
      next: (data: Cliente[]) => {
        if (data == null) {
          this.clientes = [];
        } else {
          this.clientes = data;
          this.clientesOriginais = data;
        }
      },
    });

    return this.clientes;
  }

  pesquisarCPF(){
    let cpf = this.cpfPesquisado;
    if (cpf == '' || cpf == null) {
      this.clientes = this.clientesOriginais;
    } else {
      this.clientes = this.clientesOriginais.filter( cliente => {
        return cliente.cpf == cpf; 
      })
    }
  }

  addProduto(): void {
    this.itensPedidos.push(this.itemSelecionado);
    this.totalItens = this.itensPedidos.length;
    this.pedido.itensPedido = this.itensPedidos;
    this.itemSelecionado = new ItemPedido();
  }

  removerProduto(produto: ItemPedido) {
    var index = this.itensPedidos.indexOf(produto);
    if (index > -1) {
      this.itensPedidos.splice(index, 1);
    }
  }

  clienteSelecionado(cliente: Cliente) {
    this.pedido.cliente = cliente;
  }

  atualizar(): void {
    if (this.formPedido.form.valid && this.pedido) {
      this.pedido.data = this.dataPreenchida;
      this.pedidoService.atualizarPedido(this.pedido).subscribe({
        next: (data: HttpResponse) => {
          if (data.status == 'OK') {
            this.router.navigate(['/pedidos']);
          }
        },
        error: (erro: any) => {
          this.errorMessage = erro.error.message;
        },
      });
    }
  }

  getInfoCliente(cliente?: Cliente): String {
    return new Pedido().getInfoCliente(cliente);
  }

  getInfoItem(item?: ItemPedido): String {
    return new Pedido().getInfoItem(item);
  }
}
