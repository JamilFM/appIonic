import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth'
import { Tarefas } from '../../models/tarefas'

@Injectable()
export class TarefasProvider {
  
  private caminho: string = '';
  
  private tarefasColllection: AngularFirestoreCollection<Tarefas>;
  
  tasks: Observable<Tarefas[]>;
  
  constructor(private afs: AngularFirestore, private auth: AuthProvider) {    
    
    this.auth.user.subscribe(auth => {      
      
      if(auth != null)
      {
        this.caminho = '/' + auth.email;
        this.tarefasColllection = afs.collection<Tarefas>(this.caminho, ref => {
          return ref;
        });

      } else {
        this.caminho = '';
      }
    });
  }

  // Este método será retorna um lista de tarefas pode ser
  // as finalizadas ou as que ainda não foram finalizadas
  // para filtrar passamos o parametro finalizada
  pegarTarefas(finalizada: boolean) {
    return this.afs
      .collection<Tarefas>(this.caminho, ref => {
        return ref.where('finalizada', '==', finalizada);
      })
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Tarefas;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      });
  }

  // Método usado para adicionar uma tarefa
  adicionar(tarefa: Tarefas) {
    this.tarefasColllection.add(tarefa);
  }

  // Método usado para atualizar uma tarefa
  atualizar (id: string, task:Tarefas) {
    this.tarefasColllection.doc(id).update(task);
  }

  // Método usado para excluir uma tarefa
  excluir (id: string) {
    this.tarefasColllection.doc(id).delete();
  }

}