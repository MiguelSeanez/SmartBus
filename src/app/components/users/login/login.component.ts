import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public email: string = '';
  public password: string = '';
  ngOnInit() {
  }

  onLogin(): void{
    this.authService.loginEmailUser(this.email, this.password)
    .then( (res)=> {
      this.router.navigate(['admin/list-users']);
    }).catch( err => console.log('err', err.message));
  }

  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((res) =>{
      console.log('resUser', res);
      this.router.navigate(['user/profile']);
    }).catch(err => console.log('err', err.message));
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); // Mandar a un componente (perfil o algo) que haga llenar tus datos en caso de que no los hayas llenado
    
  }
  onLogout(){
    this.afAuth.auth.signOut();
  }

}
