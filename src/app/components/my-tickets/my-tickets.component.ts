import { TicketInterface } from './../../models/ticket';
import { AngularFirestore, AngularFirestoreCollectionGroup, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserInterface } from 'src/app/models/user';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {

  ticketUser: AngularFirestoreCollectionGroup;

  constructor(private afs: AngularFirestore, private authService: AuthService, private dataApi: DataApiService) { }

  public ticketsArray = [];
  public ticket;
  public userId: string;


  ngOnInit() {
    var tArray = [];
    this.authService.isAuth().subscribe(user => {
      this.dataApi.getOneUser(user.uid).subscribe(user => {
        this.userId = user.id;

        //console.log('id', this.userId);
        let tickets = this.afs.collectionGroup('Ticket', ref => ref.where('cardId', '==', this.userId));
        tickets.get().subscribe(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // METER ESTO EN UN ARRAY PARA MOSTRARLO
            // doc.data().subscribe(ticketdata => {
            //   this.ticketsArray = doc.data();
            // });
            tArray.push(doc.data());
            //console.log(doc.id, ' => ', doc.data());
          });
        });
      })
    });
    this.ticketsArray.push(tArray);


    //console.log('Ticket ', this.ticketsArray );

  }

}
