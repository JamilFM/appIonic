import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user = {} as User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private alertCtrl: AlertController
  ) {}


  alert({ title, message }: { title: string; message: string; }) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Fechar']
    });
    alert.present();
  }

  async login(user: User) {
    if (user.email == "" || user.password == "") {
      this.alert({ title: 'Erro', message: 'É necessário informar o email e senha' });
    } else {
      try {
        const result = await this.auth.login(user);
        if (result) {
          this.navCtrl.setRoot(TabsPage);
        }
      } catch (e) {
        this.alert({ title: 'Erro ao logar', message: e.message });
      }
    }
  }

  async register(user: User) {
    if (user.email == "" || user.password == "") {
      this.alert({ title: 'Erro', message: 'É necessário informar o email e senha' });
    } else {
      try {
        const result = await this.auth.register(user);
        if (result) {
          this.navCtrl.setRoot(TabsPage);
        }
      } catch (e) {
        this.alert({ title: 'Erro ao cadastrar', message: e.message });
      }
    }
  }

  ionViewDidLoad() {
    this.auth.logout();
  }

}