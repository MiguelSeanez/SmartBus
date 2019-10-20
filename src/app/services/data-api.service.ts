import { Observable } from 'rxjs';
import { UserInterface, Roles } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) { 
    this.usersCollection = afs.collection<UserInterface>('Users');
    this.users = this.usersCollection.valueChanges();
  }

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userDoc : AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
  public selectedUser: UserInterface = {
    id: null,
    name: '',
    birthdate: '',
    gender: '',
    type: '',
    balance: 0,
    email: '',
    password: '',
    //roles: {admin: false}

  };

  getAllUsers(){
    return this.users = this.usersCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  addUser(user: UserInterface){
    this.usersCollection.add(user);
  }

  updateUser(user: UserInterface): void{
    let idUser = user.id;
    this.userDoc = this.afs.doc<UserInterface>(`Users/${idUser}`);
    this.userDoc.update(user);
  }

  deleteUser(idUser: string): void{
    this.userDoc = this.afs.doc<UserInterface>(`Users/${idUser}`);
    this.userDoc.delete();
  }

  getOneUser(idUser: string){
    this.userDoc = this.afs.doc<UserInterface>(`Users/${idUser}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists == false){
        return null;
      }else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

}
