import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPedidoComponent } from './editar-pedido/editar-pedido.component';
import { InserirPedidoComponent } from './inserir-pedido/inserir-pedido.component';
import { ListarPedidoComponent } from './listar-pedido/listar-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';

@NgModule({
  declarations: [
    EditarPedidoComponent,
    InserirPedidoComponent,
    ListarPedidoComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
})
export class PedidoModule {}
