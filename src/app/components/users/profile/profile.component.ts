import { NgForm } from '@angular/forms';
import { UserInterface } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private dataApi: DataApiService) { }

  //user: UserInterface;
  user: UserInterface ={
    id: '',
    name:'',
    email:'',
    gender: '',
    birthdate: '',
    type: '',
    balance: 0,
  }

  editando: boolean = false;

  getUser: Observable<UserInterface>;

  public providerId: string = 'null';

  ngOnInit() {
    this.authService.isAuth().subscribe(user =>{
      if(user){
        this.dataApi.getOneUser(user.uid).subscribe(user => {
          this.user = user;
          this.dataApi.selectedUser = Object.assign({}, this.user);
        });
        //this.user.id = user.uid;       
        //this.user.name = user.displayName;
        //this.user.email = user.email;
        //this.providerId = user.providerData[0].providerId;
        //this.user.balance = 10;
        
        
        console.log('user', user);
      }
    }); 
  }

  onSubmit(userForm: NgForm){
    this.editando = false;
    this.dataApi.updateUser(userForm.value);
  }

  onEdit(actualUser: UserInterface): void{
    this.editando = true;
  }


}
