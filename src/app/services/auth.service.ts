import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string){
    return new Promise((resolve, reject)=>{
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user) 
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  loginGoogleUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()) // Mandar a un componente (perfil o algo) que haga llenar tus datos en caso de que no los hayas llenado
    .then(credential => this.updateUserDataLoginGoogle(credential.user))
  }
  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      //roles: {admin: false}
    }
    return userRef.set(data, { merge: true})
  }

  private updateUserDataLoginGoogle(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      //roles: {admin: false}
    }
    return userRef.set(data, { merge: true})
  }

}
