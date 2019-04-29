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

  adicionar(tarefa: Tarefas) {
    this.tarefasColllection.add(tarefa);
  }

  atualizar (id: string, task:Tarefas) {
    this.tarefasColllection.doc(id).update(task);
  }

  excluir (id: string) {
    this.tarefasColllection.doc(id).delete();
  }

}