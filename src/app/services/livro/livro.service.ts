import { Router } from '@angular/router';
import { Livro } from './../../models/livro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_API = environment.URL_API;

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  listaTodosLivros() {
    return this.httpClient.get<Livro[]>(`${URL_API}/livros`);
  }

  listaLivroPorId(id: number) {
    return this.httpClient.get(`${URL_API}/livros/${id}`);
  }

  deletaLivro(id: number) {
    return this.httpClient.delete(`${URL_API}/livros/${id}`);
  }

  criaLivro(livro: Livro) {
    return this.httpClient.post(`${URL_API}/livros`, livro);
  }

  atualizaLivro(id: number, livro: Livro) {
    return this.httpClient.put(`${URL_API}/livros/${id}`, livro);
  }
}
