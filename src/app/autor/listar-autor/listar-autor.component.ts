import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subject } from 'rxjs';

import { Autor } from './../../models/autor';
import { AutorService } from './../../services/autor/autor.service';

@Component({
  selector: 'app-listar-autor',
  templateUrl: './listar-autor.component.html',
  styleUrls: ['./listar-autor.component.css'],
  preserveWhitespaces: true,
})
export class ListarAutorComponent implements OnInit {
  constructor(
    private autorService: AutorService,
    private router: Router,
    private title: Title
  ) {
    title.setTitle('Listar Autores');
  }

  autores$: Observable<Autor[]> | undefined;
  error$ = new Subject<boolean>();

  ngOnInit(): void {
    this.listaAutores();
  }

  listaAutores() {
    this.autores$ = this.autorService.listaTodosAutores().pipe(
      catchError((error) => {
        alert('Erro ao listar autores!');
        console.log(error);
        this.error$.next(true);
        return of();
      })
    );

    this.autorService
      .listaTodosAutores()
      .pipe(catchError((error) => of()))
      .subscribe((dados) => {
        console.log(dados);
      });
  }

  criaAutor() {
    this.router.navigate(['cadastra-autor']);
  }

  editarAutor(autor: Autor) {
    this.router.navigate(['edita-autor', autor.id]);
  }
}
