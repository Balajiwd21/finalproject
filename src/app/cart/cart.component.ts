import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-cart',
 templateUrl: './cart.component.html',
 styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
paymentHandler:any = null;
public products : any = [];

 public grandTotal !: number;

 constructor(private cartService : CartService,private router: Router) { }

ngOnInit(): void {

 this.cartService.getProducts().subscribe(res=>{

 this.products = res;

this.grandTotal = this.cartService.getTotalPrice();

})

this.invokeStripe();
}

 removeItem(item: any){

if(confirm("Are you sure to delete?"))

this.cartService.removeCartItem(item);

 alert("item delected successfully")
 

 }

emptycart(){

 this.cartService.removeAllCart();

}
 checkout() {

 localStorage.setItem('grand_total', JSON.stringify(this.grandTotal));

 }
 
 initializePayment(amount: number) {

    const paymentHandler = (<any>window).StripeCheckout.configure({

      key: 'pk_test_51M6YbLSDIJp8fQHWq3C3QKUYJaaolkjo3E0AHlDZP6GOh1mKrkiZPS9RqikE38N3UBLpZEpB6cubZau1mrHZuDv000kd1oCTlj',

      locale: 'auto',

      token: (stripeToken: any)=> {

        console.log({stripeToken})

        alert('payment successful');
        this.router.navigate(['../final'])

      }

    });

 

    paymentHandler.open({

      name: 'Eventrra',

      description: 'Advance pay',

      amount: amount * 100,
      currency:'inr'

    });

  }

 

  invokeStripe() {

    if(!window.document.getElementById('stripe-script')) {

      const script = window.document.createElement("script");

      script.id = "stripe-script";

      script.type = "text/javascript";

      script.src = "https://checkout.stripe.com/checkout.js";

      script.onload = () => {

        this.paymentHandler = (<any>window).StripeCheckout.configure({

          key: 'pk_test_51M6YbLSDIJp8fQHWq3C3QKUYJaaolkjo3E0AHlDZP6GOh1mKrkiZPS9RqikE38N3UBLpZEpB6cubZau1mrHZuDv000kd1oCTlj',

          locale: 'auto',

          token: function (stripeToken: any) {

            console.log(stripeToken)

            alert('Payment has been successfull!');

          }

        });

      }

      window.document.body.appendChild(script);

    }

  }
}

