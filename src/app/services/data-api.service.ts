import { Observable } from 'rxjs';
import { UserInterface, Roles } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { map, reduce } from 'rxjs/operators';
import { TicketInterface } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) { 
    //this.users = this.usersCollection.valueChanges();
  }

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userDoc : AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
  private ticketUser: AngularFirestoreCollectionGroup;
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
    this.usersCollection = this.afs.collection<UserInterface>('Users');
    return this.users = this.usersCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getTicketUser(user: UserInterface){
    
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
