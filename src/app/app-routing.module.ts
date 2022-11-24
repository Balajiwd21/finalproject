import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import {canActivate,redirectLoggedInTo,redirectUnauthorizedTo,} from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';
import { FinalComponent } from './final/final.component';
import { FirstComponent } from './first/first.component';
import { NavbarComponent } from './navbar/navbar.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {path:'',component:FirstComponent,pathMatch:'full'},

  {path:'cart',component:CartComponent,
...canActivate(redirectUnauthorizedToLogin)},
  {path:'home',component:HomeComponent},
  {path:'final',component:FinalComponent},
 {path:'login',component:LoginComponent,
 ...canActivate(redirectLoggedInToHome),},
 {path:'navbar',component:NavbarComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
