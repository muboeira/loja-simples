import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '../models/http-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  protected listar(url: string): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL + url, this.httpOptions);
  }

  protected buscarPorId(url: string): Observable<any> {
    return this.http.get<any>(this.BASE_URL + url, this.httpOptions);
  }

  protected inserir(url: string, body: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(
      this.BASE_URL + url,
      JSON.stringify(body),
      this.httpOptions
    );
  }

  protected atualizar(url: string, body: any): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(
      this.BASE_URL + url,
      JSON.stringify(body),
      this.httpOptions
    );
  }

  protected remover(url: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(
      this.BASE_URL + url,
      this.httpOptions
    );
  }
}
