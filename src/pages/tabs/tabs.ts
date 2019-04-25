import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { TarefasFinalizadasPage } from '../tarefas-finalizadas/tarefas-finalizadas';
import { AuthProvider } from '../../providers/auth/auth'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TarefasFinalizadasPage;

  constructor(public navCtrl: NavController, 
              private auth: AuthProvider) {
              this.auth.user.subscribe(
      (auth) => {
        if (auth == null) {
          this.navCtrl.setRoot(LoginPage);
        }
      });
  }
}