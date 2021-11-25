import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { HttpResponse } from '../../shared/models/http-response';

@Component({
  selector: 'app-inserir-cliente',
  templateUrl: './inserir-cliente.component.html',
  styleUrls: ['./inserir-cliente.component.scss'],
})
export class InserirClienteComponent implements OnInit {
  @ViewChild('formCliente') formCliente!: NgForm;

  cliente!: Cliente;
  errorMessage!: String;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  inserir(): void {
    if (this.formCliente.form.valid && this.cliente) {
      this.clienteService.inserir(this.cliente).subscribe({
        next: (data: HttpResponse) => {
          if (data.status == 'CREATED') {
            this.router.navigate(['/clientes']);
          }
        },
        error: (erro: any) => {
          this.errorMessage = erro.error.message;
        },
      });
    }
  }
}
