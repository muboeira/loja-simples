import { ClienteService } from './../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Router } from '@angular/router';
import { HttpResponse } from '../../shared/models/http-response';


@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss'],
})
export class ListarClienteComponent implements OnInit {
  clientes!: Cliente[];
  totalClientes!: Number;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientes = this.listarTodos();
  }

  listarTodos(): Cliente[] {
    this.clienteService.listarTodos().subscribe({
      next: (data: Cliente[]) => {
        if (data == null) {
          this.clientes = [];
        } else {
          this.clientes = data;
          this.totalClientes = data.length; 
        }
      },
    });

    return this.clientes;
  }

  remover($event: any, cliente: Cliente): void {
    $event.preventDefault();
    if (
      confirm(
        'Deseja realmente remover o cliente "' + cliente.nome + '"?'
      ) &&
      cliente.id
    ) {
      this.clienteService.remover(cliente.id).subscribe({
        next: (data: HttpResponse) => {
          if(data.status == 'OK') {
            this.listarTodos();
          }else {
            alert(data.message)
          }
        }
      });   
    }
  }
}
