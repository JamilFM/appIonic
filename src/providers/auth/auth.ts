import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { User } from '../../models/user';


@Injectable()
export class AuthProvider {
  
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  
  register(user: User) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  
  login(user: User) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  
  logout() {
    return this.firebaseAuth.auth.signOut();
  }

}