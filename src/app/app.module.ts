import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarAutorComponent } from './autor/cadastrar-autor/cadastrar-autor.component';
import { EditarAutorComponent } from './autor/editar-autor/editar-autor.component';
import { ListarAutorComponent } from './autor/listar-autor/listar-autor.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CadastrarLivroComponent } from './livros/cadastrar-livro/cadastrar-livro.component';
import { EditarLivroComponent } from './livros/editar-livro/editar-livro.component';
import { ListarLivrosComponent } from './livros/listar-livros/listar-livros.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CadastrarAutorComponent,
    ListarAutorComponent,
    ListarLivrosComponent,
    EditarLivroComponent,
    CadastrarLivroComponent,
    EditarAutorComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
