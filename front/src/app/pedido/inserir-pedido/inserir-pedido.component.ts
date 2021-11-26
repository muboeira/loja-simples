import { ItemPedido } from './../../shared/models/itemPedido';
import { PedidoService } from './../services/pedido.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from './../../cliente/services/cliente.service';
import { ProdutoService } from 'src/app/produto/services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '../../shared/models/http-response';

@Component({
  selector: 'app-inserir-pedido',
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.scss']
})
export class InserirPedidoComponent implements OnInit {
  @ViewChild('formPedido') formPedido!: NgForm;

  produtos!: Produto[];
  clientes!: Cliente[];
  itensPedidos: ItemPedido[] = [];
  pedido: Pedido = new Pedido();
  itemSelecionado: ItemPedido = new ItemPedido();
  totalItens = 0;
  cpfPesquisado: any;
  dataPreenchida: any;
  errorMessage!: String;
  selectedDate: any;
  
  constructor(private produtoService: ProdutoService,
              private clienteService: ClienteService,
              private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit(): void {
    this.produtos = this.listarTodosProdutos();
    this.clientes = this.listarTodosClientes();
    console.log(this.pedido);
  }

  listarTodosProdutos(): Produto[] {
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

  listarTodosClientes(): Cliente[] {
    this.clienteService.listarTodos().subscribe({
      next: (data: Cliente[]) => {
        if (data == null) {
          this.clientes = [];
        } else {
          this.clientes = data;
        }
      }
    });

    return this.clientes;
  }

  pesquisarCPF(){
    let cpf = this.cpfPesquisado;
    this.clientes = [...this.clientes].filter(function(tag) {
        return tag.cpf.indexOf(cpf) >= 0;
    }); 
  }

  addProduto(): void{
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
    console.log(index);
    console.log(this.itensPedidos);
  }

  clienteSelecionado(cliente: Cliente){
    this.pedido.cliente = cliente;
  }
  
  inserir(){
    if (this.formPedido.form.valid && this.pedido) {
      console.log(this.pedido);
      this.pedido.data = this.dataPreenchida;
      this.pedidoService.inserir(this.pedido).subscribe({
        next: (data: HttpResponse) => {
          if (data.status == 'CREATED') {
            this.router.navigate(['/pedidos']);
          }
        },
        error: (erro: any) => {
          this.errorMessage = erro.error.message;
        }
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
