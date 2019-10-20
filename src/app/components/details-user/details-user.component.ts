import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/user';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }

  public user: UserInterface;

  ngOnInit() {
    const idUser = this.route.snapshot.params['id'];
    this.getDatails(idUser);
  }

  getDatails(idUser: string){
    this.dataApi.getOneUser(idUser).subscribe(user => {
      this.user = user;
    });
  }

}
