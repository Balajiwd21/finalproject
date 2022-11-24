import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
selector: 'app-products',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public totalItem: number =0;
public productList : any ;

constructor(private api : ApiService,private cartService : CartService) { }

 ngOnInit(): void {

 this.cartService.getProducts()
 .subscribe(res=>{
   this.totalItem=res.length;
 })
 this.api.getProduct()

 .subscribe(res=>{
this.productList = res;

this.productList.forEach((a:any) =>{

 Object.assign(a,{quantity:1,total:a.price});

 })



});

}

addtocart(item: any){

 this.cartService.addtoCart(item);

}

}

