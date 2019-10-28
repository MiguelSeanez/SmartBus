import { ClusterComponent } from './components/cluster/cluster.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { ListUsersComponent } from './components/admin/list-users/list-users.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';


const routes: Routes = [
  { path: '', component: HomeComponent}, 
  
  { path: 'admin/list-users', component: ListUsersComponent, canActivate: [AuthGuard]}, //TODO: only auth users
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},  //TODO: only auth users
  { path: 'user/:id', component: DetailsUserComponent, canActivate: [AuthGuard] },
  { path: 'cluster', component: ClusterComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component}
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
