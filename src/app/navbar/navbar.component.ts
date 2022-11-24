import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MatDialog,MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalItem: number =0;
  public productList : any ;
  
    constructor(public dialog:MatDialog, public authService:AuthenticationService, private router:Router,private api : ApiService,private cartService : CartService){}
    
    ngOnInit(): void {this.cartService.getProducts()
   .subscribe(res=>{
     this.totalItem=res.length;
   })}
    
    logout() {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['']);
      });
    }
    openDialog()
    {
      const configDia=new MatDialogConfig();
      configDia.width="40%";
      configDia.autoFocus=true;
      configDia.disableClose=true;
      this.dialog.open(LoginComponent,configDia);
      }
  
  
  }
