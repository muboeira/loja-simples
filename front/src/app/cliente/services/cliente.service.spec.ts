import { Cliente } from './../../shared/models/cliente.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { HttpResponse } from 'src/app/shared/models/http-response';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let cliente: Cliente = new Cliente(1, 'Bruno', 'Moraes', '12345678901');
  let httpResponse: HttpResponse = new HttpResponse(
    'CREATED',
    'Cliente cadastrado com sucesso.'
  );
  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [ClienteService, { provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(ClienteService);
  });

  it('deve estar criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar todos clientes', (done) => {
    let clientes: Cliente[] = [cliente];
    httpSpy.get.and.returnValue(of(clientes));
    service.listarTodos().subscribe((result) => {
      expect(result).toEqual(clientes);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('deve deletar o cliente pelo id', (done) => {
    httpSpy.delete.and.returnValue(of(null));
    service.remover(1).subscribe(() => done(), done.fail);
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

  it('deve buscar cliente por id', (done) => {
    httpSpy.get.and.returnValue(of(cliente));
    service.buscarPorId(1).subscribe((result) => {
      expect(result).toEqual(cliente);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('deve salvar cliente', (done) => {
    httpSpy.post.and.returnValue(of(httpResponse));

    service.inserir(cliente).subscribe((result) => {
      expect(result).toEqual(httpResponse);
      done();
    }, done.fail);
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('deve atualizar cliente', (done) => {
    httpSpy.put.and.returnValue(of(httpResponse));

    service.atualizar(cliente).subscribe((result) => {
      expect(result).toEqual(httpResponse);
      done();
    }, done.fail);
    expect(httpSpy.put.calls.count()).toBe(1);
  });
});
