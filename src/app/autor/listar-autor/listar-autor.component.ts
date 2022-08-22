import { Autor } from './../../models/autor';
import { Router } from '@angular/router';
import { AutorService } from './../../services/autor/autor.service';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-listar-autor',
  templateUrl: './listar-autor.component.html',
  styleUrls: ['./listar-autor.component.css'],
  preserveWhitespaces: true,
})
export class ListarAutorComponent implements OnInit {
  constructor(private autorService: AutorService, private router: Router) {}

  autores$: Observable<Autor[]> | undefined;
  error$ = new Subject<boolean>();

  ngOnInit(): void {
    this.listAutores();
  }

  listAutores() {
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

  onDelete(Autor: any) {
    // this.cursoSelecionado = cursos;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm',
    // });
  }
}
