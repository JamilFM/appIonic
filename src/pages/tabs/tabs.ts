import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { TarefasFinalizadasPage } from '../tarefas-finalizadas/tarefas-finalizadas';
import { ListagemCategoriasPage } from './../listagem-categorias/listagem-categorias';

import { AuthProvider } from '../../providers/auth/auth'

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  
  tab1Root = ListagemCategoriasPage;
  tab2Root = HomePage; 
  tab3Root = TarefasFinalizadasPage;
  
  

  constructor(public navCtrl: NavController, private auth: AuthProvider) {
              this.auth.user.subscribe((auth) => {
        if (auth == null) {
          this.navCtrl.setRoot(LoginPage);
        }
      });
  }
}