import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../../shared/models/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-inserir-produto',
  templateUrl: './inserir-produto.component.html',
  styleUrls: ['./inserir-produto.component.scss']
})
export class InserirProdutoComponent implements OnInit {
  @ViewChild('formProduto') formProduto!: NgForm;

  produto!: Produto;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produto = new Produto();
  }

  inserir(): void {
    if (this.formProduto.form.valid && this.produto) {
      this.produtoService.inserir(this.produto).subscribe({
        next: (data: Produto) => {
          this.router.navigate(['/produtos']);
        }
      });
    }
  }

}