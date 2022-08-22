import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Autor } from './../../models/autor';
import { AutorService } from './../../services/autor/autor.service';

@Component({
  selector: 'app-cadastrar-autor',
  templateUrl: './cadastrar-autor.component.html',
  styleUrls: ['./cadastrar-autor.component.css'],
  preserveWhitespaces: true,
})
export class CadastrarAutorComponent implements OnInit {
  autorForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.autorForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      biografia: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  cadastraAutor() {
    if (this.autorForm.valid) {
      const autor = this.autorForm.getRawValue() as Autor;

      this.autorService.criaAutor(autor).subscribe({
        next: (resposta) => {
          alert('Autor criado com sucesso!');
          this.autorForm.reset();
        },
        error: (erro) => {
          alert('Erro ao cadastrar autor!');
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
