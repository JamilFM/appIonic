import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { Tarefas } from '../../models/tarefas'
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-tarefas-finalizadas',
  templateUrl: 'tarefas-finalizadas.html',
})
export class TarefasFinalizadasPage {

  tarefas: Observable<Tarefas[]>;
  auth: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tarefasProvider: TarefasProvider) {
  }

  excluir(id: string) {
    this.tarefasProvider.excluir(id);
  }

  sair() {
    this.navCtrl.setRoot(LoginPage);
  };


  ionViewDidLoad() {
    this.tarefas = this.tarefasProvider.pegarTarefas(true);
  }

}