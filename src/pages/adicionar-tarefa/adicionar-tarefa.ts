import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TarefasProvider } from '../../providers/tarefas/tarefas';

import { Tarefas } from '../../models/tarefas';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-adicionar-tarefa',
  templateUrl: 'adicionar-tarefa.html',
})
export class AdicionarTarefaPage {

  public tarefa = {} as Tarefas;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private tarefasProvider:TarefasProvider) {
  }

  adicionarTarefa(tarefa: Tarefas) {
      tarefa.finalizada = false;
      this.tarefasProvider.adicionar(tarefa);
      this.navCtrl.setRoot(TabsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarTarefaPage');
  }

}