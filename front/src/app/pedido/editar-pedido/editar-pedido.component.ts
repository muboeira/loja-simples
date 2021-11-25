import { ItemPedido } from './../../shared/models/itemPedido';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { HttpResponse } from 'src/app/shared/models/http-response';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {
  @ViewChild('formPedido') formPedido!: NgForm;

  pedido!: Pedido;
  errorMessage!: String;
  itensPedidos: ItemPedido[] = []

  constructor(
    private pedidoService: PedidoService,
    private routerParams: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarPedido();
  }

  buscarPedido(): void {
    const id = +this.routerParams.snapshot.params['pedidoId'];

    this.pedidoService.buscarPorId(id).subscribe({
      next: (data: Pedido | undefined) => {
        if (data == undefined) {
          this.router.navigate(['/pedidos']);
        } else {
          this.pedido = data;
          console.log(this.pedido);
        }
      },
    });
  }

  atualizar(): void {
    if (this.formPedido.form.valid && this.pedido) {
      this.pedidoService.atualizar(this.pedido).subscribe({
        next: (data: HttpResponse) => {
          if (data.status == 'OK') {
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

}
