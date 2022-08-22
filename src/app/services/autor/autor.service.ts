import { Autor } from './../../models/autor';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const URL_API = environment.URL_API;

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  listaTodosAutores() {
    return this.httpClient.get<Autor[]>(`${URL_API}/autores`);
  }

  listaAutorPorId(id: number) {
    return this.httpClient.get(`${URL_API}/autores/${id}`);
  }

  criaAutor(autor: Autor) {
    return this.httpClient.post(`${URL_API}/autores`, autor);
  }

  atualizaAutor(id: number, autor: Autor) {
    return this.httpClient.put(`${URL_API}/autores/${id}`, autor);
  }
}
