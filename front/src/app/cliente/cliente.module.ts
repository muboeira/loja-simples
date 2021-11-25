import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InserirClienteComponent } from './inserir-cliente/inserir-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    ListarClienteComponent,
    InserirClienteComponent,
    EditarClienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
})
export class ClienteModule {}
