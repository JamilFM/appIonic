import { Items } from './listagem-categorias';
import { AngularFireDatabase } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { Component } from '@angular/core';
import { CardsPage } from '../cards/cards';

export interface Items {
  Categorias: string;
}

@IonicPage()
@Component({
  selector: 'page-listagem-categorias',
  templateUrl: 'listagem-categorias.html',
})

export class ListagemCategoriasPage {

  items = {} as Items
  arrayItems: any[] = [];

  constructor(public navCtrl: NavController,
    private afs: AngularFireDatabase,
    public navParams: NavParams) {

    this.afs
      .list("Categorias")
      .snapshotChanges()
      .subscribe((data) => {
        data.map((item) => {
          console.log(item.payload.val() as Items);
          this.arrayItems.push(item.payload.val() as Items);
          console.log(this.items)

        })
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListagemCategoriasPage');
  }
  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.arrayItems = this.arrayItems.filter((item) => {
        return (item.item().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  itemSelected(arr: any) {
    this.navCtrl.push(CardsPage, {
      item: arr
    });
    console.log("Selected Item", arr);
  }
} 
