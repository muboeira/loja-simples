import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InserirProdutoComponent } from './inserir-produto/inserir-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';


@NgModule({
  declarations: [
    InserirProdutoComponent,
    EditarProdutoComponent,
    ListarProdutoComponent
  ],
  imports: [
    CommonModule, RouterModule, FormsModule
  ]
})
export class ProdutoModule { }
