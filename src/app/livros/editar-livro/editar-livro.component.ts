import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Livro } from './../../models/livro';
import { LivroService } from './../../services/livro/livro.service';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.css'],
  preserveWhitespaces: true,
})
export class EditarLivroComponent implements OnInit {
  livroForm!: FormGroup;

  livro!: Livro;

  livroId!: number;

  stringAutoresIds: number[] = [];

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private livroService: LivroService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    title.setTitle('Editar Livro');
  }

  ngOnInit(): void {
    this.livroId = Number(this.activatedRoute.snapshot.paramMap.get('livroId'));

    this.livroForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      anoLancamento: ['', [Validators.required, Validators.maxLength(1000)]],
      autoresIds: ['', [Validators.required]],
    });

    this.livroService.listaLivroPorId(this.livroId).subscribe({
      next: (retorno) => {
        this.livro = retorno as Livro;

        this.livroForm.get('titulo')?.setValue(this.livro.titulo);
        this.livroForm.get('anoLancamento')?.setValue(this.livro.anoLancamento);
        this.livroForm.get('autoresIds')?.setValue(this.livro.autoresIds);

        for (var autor of this.livro.autores) {
          this.stringAutoresIds.push(autor.id);
        }
        this.livroForm.get(['autoresIds'])?.setValue(this.stringAutoresIds);
      },
      error: (erro) => {
        alert('Não foi possível achar o livro');
      },
    });
  }

  atualizaLivro() {
    if (this.livroForm.valid) {
      const livro = this.livroForm.getRawValue() as Livro;
      const autoresString = this.livroForm.get('autoresIds')?.value + [''];
      const autores = autoresString.split(',');
      livro.autoresIds = autores;

      this.livroService.atualizaLivro(this.livro.id, livro).subscribe({
        next: (resposta) => {
          alert('Livro atualizado com sucesso!');
          this.router.navigate(['lista-livros']);
        },
        error: (erro) => {
          alert('Erro ao atualizar livro!');
        },
      });
    } else {
      alert('Preencha o formulário corretamente!');
    }
  }

  cancelar() {
    this.router.navigate(['lista-livros']);
  }
}
