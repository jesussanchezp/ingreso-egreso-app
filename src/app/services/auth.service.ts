import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private fireStore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe( firebaseUser => {
      console.log(firebaseUser?.uid, firebaseUser?.email);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then( ({ user }) => {
      const newUser = new Usuario(user.uid, nombre, email);
      return this.fireStore.doc(`${user.uid}/usuario`).set({...newUser});
    });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUsuario() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe( map( firebaseUser => firebaseUser != null) );
  }
}
