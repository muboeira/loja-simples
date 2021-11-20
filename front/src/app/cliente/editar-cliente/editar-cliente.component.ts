import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { HttpResponse } from '../../shared/models/http-response';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss'],
})
export class EditarClienteComponent implements OnInit {
  @ViewChild('formCliente') formCliente!: NgForm;

  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private routerParams: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarCliente();
  }

  buscarCliente(): void {
    const id = +this.routerParams.snapshot.params['clienteId'];

    this.clienteService.buscarPorId(id).subscribe({
      next: (data: Cliente | undefined) => {
        if (data == undefined) {
          this.router.navigate(['/clientes']);
        } else {
          this.cliente = data;
        }
      },
    });
  }

  atualizar(): void {
    if (this.formCliente.form.valid && this.cliente) {
      this.clienteService.atualizar(this.cliente).subscribe({
        next: (data: HttpResponse) => {
          console.log(data);
          if (data.status == 'OK') {
            this.router.navigate(['/clientes']);
          } else {
            alert(data.message);
          }
        },
      });
    }
  }
}
