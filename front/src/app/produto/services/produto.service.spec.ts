import { Produto } from './../../shared/models/produto.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProdutoService } from './produto.service';
import { HttpResponse } from 'src/app/shared/models/http-response';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let produto: Produto = new Produto(1, 'Produto X');
  let httpResponse: HttpResponse = new HttpResponse(
    'CREATED',
    'Produto cadastrado com sucesso.'
  );
  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [ProdutoService, { provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(ProdutoService);
  });

  it('deve estar criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar todos produtos', (done) => {
    let produtos: Produto[] = [produto];
    httpSpy.get.and.returnValue(of(produtos));
    service.listarTodos().subscribe((result) => {
      expect(result).toEqual(produtos);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('deve deletar o produto pelo id', (done) => {
    httpSpy.delete.and.returnValue(of(null));
    service.remover(1).subscribe(() => done(), done.fail);
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

  it('deve buscar produto por id', (done) => {
    httpSpy.get.and.returnValue(of(produto));
    service.buscarPorId(1).subscribe((result) => {
      expect(result).toEqual(produto);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('deve salvar produto', (done) => {
    httpSpy.post.and.returnValue(of(httpResponse));

    service.inserir(produto).subscribe((result) => {
      expect(result).toEqual(httpResponse);
      done();
    }, done.fail);
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('deve atualizar produto', (done) => {
    httpSpy.put.and.returnValue(of(httpResponse));

    service.atualizar(produto).subscribe((result) => {
      expect(result).toEqual(httpResponse);
      done();
    }, done.fail);
    expect(httpSpy.put.calls.count()).toBe(1);
  });
});
