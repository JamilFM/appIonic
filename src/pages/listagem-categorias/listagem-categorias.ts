import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';


@IonicPage()
@Component({
  selector: 'page-listagem-categorias',
  templateUrl: 'listagem-categorias.html',
})
export class ListagemCategoriasPage {

  constructor(public navCtrl: NavController, private afs: AngularFirestore, public navParams: NavParams) {

    this.afs
      .collection("Categorias")
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
           console.log( a.payload.doc.data())
         
        })
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListagemCategoriasPage');
  }

}
