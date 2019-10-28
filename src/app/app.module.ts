import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './components/admin/list-users/list-users.component';
import { HomeComponent } from './components/home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ClusterComponent } from './components/cluster/cluster.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    HomeComponent,
    HeroComponent,
    DetailsUserComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    ClusterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [ AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
