import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemCategoriasPage } from './listagem-categorias';

@NgModule({
  declarations: [
    ListagemCategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemCategoriasPage),
  ],
})
export class ListagemCategoriasPageModule {}
