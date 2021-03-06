import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../shared/models/produto.model';
import { ProdutoService } from '../services/produto.service';
import { HttpResponse } from '../../shared/models/http-response';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss'],
})
export class EditarProdutoComponent implements OnInit {
  @ViewChild('formProduto') formProduto!: NgForm;

  produto!: Produto;
  errorMessage!: String;

  constructor(
    private produtoService: ProdutoService,
    private routerParams: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarProduto();
  }

  buscarProduto(): void {
    const id = +this.routerParams.snapshot.params['produtoId'];

    this.produtoService.buscarProdutoPorId(id).subscribe({
      next: (data: Produto | undefined) => {
        if (data == undefined) {
          this.router.navigate(['/produtos']);
        } else {
          this.produto = data;
        }
      },
    });
  }

  atualizar(): void {
    if (this.formProduto.form.valid && this.produto) {
      this.produtoService.atualizarProduto(this.produto).subscribe({
        next: (data: HttpResponse) => {
          if (data.status == 'OK') {
            this.router.navigate(['/produtos']);
          }
        },
        error: (erro: any) => {
          this.errorMessage = erro.error.message;
        },
      });
    }
  }
}
