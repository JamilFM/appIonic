import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { AdicionarTarefaPage } from '../adicionar-tarefa/adicionar-tarefa';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { Tarefas } from '../../models/tarefas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tarefas: Observable<Tarefas[]>;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    private tarefasProvider: TarefasProvider) {
  }

  adicionar() {
    this.navCtrl.push(AdicionarTarefaPage);
  }
  finalizar(tarefa: Tarefas) {
    tarefa.finalizada = true;
    this.tarefasProvider.atualizar(tarefa.id, tarefa);
  }
  excluir(id: string) {
    this.tarefasProvider.excluir(id);
  }



  ionViewDidLoad() {
    this.tarefas = this.tarefasProvider.pegarTarefas(false);
  }
}