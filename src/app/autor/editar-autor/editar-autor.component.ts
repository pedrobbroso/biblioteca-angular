import { Autor } from './../../models/autor';
import { Router, ActivatedRoute } from '@angular/router';
import { AutorService } from './../../services/autor/autor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-autor',
  templateUrl: './editar-autor.component.html',
  styleUrls: ['./editar-autor.component.css'],
  preserveWhitespaces: true,
})
export class EditarAutorComponent implements OnInit {
  autorForm!: FormGroup;

  autor!: Autor;

  autorId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.autorId = Number(this.activatedRoute.snapshot.paramMap.get('autorId'));

    this.autorForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      biografia: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    this.autorService.listaAutorPorId(this.autorId).subscribe({
      next: (retorno) => {
        this.autor = retorno as Autor;

        this.autorForm.get('nome')?.setValue(this.autor.nome);
        this.autorForm.get('biografia')?.setValue(this.autor.biografia);
      },
      error: (erro) => {
        alert('Não foi possível achar o autor');
      },
    });
  }

  atualizaAutor() {
    if (this.autorForm.valid) {
      const autor = this.autorForm.getRawValue() as Autor;

      this.autorService.atualizaAutor(this.autor.id, autor).subscribe({
        next: (resposta) => {
          alert('Autor atualizado com sucesso!');
          this.router.navigate(['lista-autores']);
        },
        error: (erro) => {
          alert('Erro ao atualizar autor!');
        },
      });
    } else {
      alert('Preencha o formulário corretamente!');
    }
  }

  cancelar() {
    this.router.navigate(['lista-autores']);
  }
}
