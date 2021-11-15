import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Produto
import { EditarProdutoComponent } from './produto/editar-produto/editar-produto.component';
import { InserirProdutoComponent } from './produto/inserir-produto/inserir-produto.component';
import { ListarProdutoComponent } from './produto/listar-produto/listar-produto.component';

const produtosRoutes: Routes = [
  { path: 'produtos', redirectTo: 'produtos/listar', pathMatch: 'full' },
  { path: 'produtos/listar', component: ListarProdutoComponent },
  { path: 'produtos/novo', component: InserirProdutoComponent },
  { path: 'produtos/editar/:produtoId', component: EditarProdutoComponent },
];

const routes: Routes = [
  { path: '', redirectTo: 'produtos/listar', pathMatch: 'full' },
  ...produtosRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
