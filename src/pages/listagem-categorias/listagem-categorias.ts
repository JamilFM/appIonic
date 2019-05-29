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
    this.initializeItems();
  }

  initializeItems() {
    this.arrayItems = [];
    this.afs
      .list("Categorias")
      .snapshotChanges()
      .subscribe((data) => {
        data.map((item) => {
          this.arrayItems.push(item.payload.val() as Items);
        })
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListagemCategoriasPage');
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.arrayItems = this.arrayItems.filter((item) => {
        return (item.Categoria.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
