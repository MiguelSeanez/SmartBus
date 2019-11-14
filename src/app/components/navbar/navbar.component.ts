import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  adminK = 'GEZMP3lyL2PnnZ3wMlE975xe5jC3';

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth => {
      if(auth){
        //console.log('user logged');
        this.isLogged = true;
        if(auth.uid == this.adminK){
          this.isAdmin = true;
        }
      }
      else{
        //console.log('NOT user logged');
        this.isLogged = false;
      }
    })
  }

  onLogout(){
    this.afsAuth.auth.signOut();
  }
}
