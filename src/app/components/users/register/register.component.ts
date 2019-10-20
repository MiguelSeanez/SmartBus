import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  public email: string = '';
  public password: string = '';
  

  ngOnInit() {
  }

  onAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then((res)=> {
      this.router.navigate(['admin/list-users']);
    }).catch(err => console.log('err', err));
  }

  
  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((res) =>{
      console.log('resUser', res);
      this.router.navigate(['admin/list-users']);
    }).catch(err => console.log('err', err.message));
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); // Mandar a un componente (perfil o algo) que haga llenar tus datos en caso de que no los hayas llenado
    
  }

}
