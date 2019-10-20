import { UserInterface } from './../../../models/user';
import { DataApiService } from './../../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  public users = [];
  public user = '';

  ngOnInit() {
    this.dataApi.getAllUsers().subscribe(users => {
      console.log('USERS', users);
      this.users = users;
    })
  }

  onDelete(idUser: string): void{
    const confirmar = confirm('Estas seguro?');
    if(confirmar){
      this.dataApi.deleteUser(idUser);
      console.log('deleted', idUser);
    }
  }

  onEdit(user: UserInterface): void{
    console.log('user', user)
    this.dataApi.selectedUser = Object.assign({}, user);
  }

  onSubmit(userForm: NgForm){
    this.dataApi.updateUser(userForm.value);
  }

}
