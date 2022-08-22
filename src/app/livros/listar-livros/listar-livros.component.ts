import { Observable, Subject, catchError, of } from 'rxjs';
import { Livro } from './../../models/livro';
import { Router } from '@angular/router';
import { LivroService } from './../../services/livro/livro.service';
import { Component, OnInit } from '@angular/core';

declare function abreModal(id: string): any;

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.css'],
  preserveWhitespaces: true,
})
export class ListarLivrosComponent implements OnInit {
  constructor(private livroService: LivroService, private router: Router) {}

  livros$: Observable<Livro[]> | undefined;
  error$ = new Subject<boolean>();

  livros: Livro[] = [];

  livroSelecionado!: Livro;

  idParaExclusao!: number;
  nome!: string;

  ngOnInit(): void {
    this.listarLivros();
  }

  listarLivros() {
    this.livros$ = this.livroService.listaTodosLivros().pipe(
      catchError((error) => {
        alert('Erro ao listar livros!');
        console.log(error);
        this.error$.next(true);
        return of();
      })
    );

    this.livroService
      .listaTodosLivros()
      .pipe(catchError((error) => of()))
      .subscribe((dados) => {
        console.log(dados);
      });
  }

  cadastrarLivro() {
    this.router.navigate(['cadastra-livro']);
  }

  editarLivro(livro: Livro) {
    this.router.navigate(['edita-livro', livro.id]);
  }

  deletarLivro(id: number) {
    this.livroService.deletaLivro(id).subscribe({
      next: (resposta) => {
        abreModal('modalDeleta');
        this.listarLivros();
      },
      error: (erro) => {
        alert('Não foi possível excluir o livro');
      },
    });
  }

  confirmaExclusao(livro: Livro) {
    this.idParaExclusao = livro.id;
    this.nome = livro.titulo;
    abreModal('modalConfirmacao');
  }
}
