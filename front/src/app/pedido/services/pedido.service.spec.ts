import { Pedido } from './../../shared/models/pedido.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PedidoService } from './pedido.service';
import { HttpResponse } from 'src/app/shared/models/http-response';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ItemPedido } from 'src/app/shared/models/itemPedido';
import { Produto } from 'src/app/shared/models/produto.model';

describe('PedidoService', () => {
  let service: PedidoService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let cliente: Cliente = new Cliente(1, 'Bruno', 'Moraes', '12345678901');
  let produto: Produto = new Produto(1, 'Produto 1');
  let itemsPedido: Array<ItemPedido> = [new ItemPedido(1, produto)];
  let pedido: Pedido = new Pedido(1, 'pedido x', cliente, itemsPedido);
  let httpResponse: HttpResponse = new HttpResponse(
    'CREATED',
    'Pedido cadastrado com sucesso.'
  );
  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [PedidoService, { provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(PedidoService);
  });

  it('deve estar criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar todos pedidos', (done) => {
    let pedidos: Pedido[] = [pedido];
    httpSpy.get.and.returnValue(of(pedidos));
    service.listarTodos().subscribe((result) => {
      expect(result).toEqual(pedidos);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('deve deletar o pedido pelo id', (done) => {
    httpSpy.delete.and.returnValue(of(null));
    service.removerPedido(1).subscribe(() => done(), done.fail);
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

  it('deve salvar pedido', (done) => {
    httpSpy.post.and.returnValue(of(httpResponse));

    service.inserirPedido(pedido).subscribe((result) => {
      expect(result).toEqual(httpResponse);
      done();
    }, done.fail);
    expect(httpSpy.post.calls.count()).toBe(1);
  });
});
