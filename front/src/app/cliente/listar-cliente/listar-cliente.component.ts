import { ClienteService } from './../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss'],
})
export class ListarClienteComponent implements OnInit {
  clientes!: Cliente[];

  constructor(private clienteService: ClienteService) {}

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
        }
      },
    });

    return this.clientes;
  }
}
