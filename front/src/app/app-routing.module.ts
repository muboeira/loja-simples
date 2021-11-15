import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Produto
import { EditarProdutoComponent } from './produto/editar-produto/editar-produto.component';
import { InserirProdutoComponent } from './produto/inserir-produto/inserir-produto.component';
import { ListarProdutoComponent } from './produto/listar-produto/listar-produto.component';

//Pedido
import { ListarPedidoComponent } from './pedido/listar-pedido/listar-pedido.component';
import { InserirPedidoComponent } from './pedido/inserir-pedido/inserir-pedido.component';
import { EditarPedidoComponent } from './pedido/editar-pedido/editar-pedido.component';

const produtosRoutes: Routes = [
  { path: 'produtos', redirectTo: 'produtos/listar', pathMatch: 'full' },
  { path: 'produtos/listar', component: ListarProdutoComponent },
  { path: 'produtos/novo', component: InserirProdutoComponent },
  { path: 'produtos/editar/:produtoId', component: EditarProdutoComponent },
];

const pedidosRoutes: Routes = [
  { path: 'pedidos', redirectTo: 'pedidos/listar', pathMatch: 'full' },
  { path: 'pedidos/listar', component: ListarPedidoComponent },
  { path: 'pedidos/novo', component: InserirPedidoComponent },
  { path: 'pedidos/editar/:pedidoId', component: EditarPedidoComponent }
]

const routes: Routes = [
  { path: '', redirectTo: 'produtos/listar', pathMatch: 'full' },
  ...produtosRoutes,
  ...pedidosRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
