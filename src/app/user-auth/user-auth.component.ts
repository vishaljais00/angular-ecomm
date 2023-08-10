import { Component, OnInit } from '@angular/core';
import { Login, Signup } from '../interface/seller.interface';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserLogin, UserSignup } from '../interface/user';
import { cart, product } from '../interface/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  loginError: boolean = false
  loginON : boolean = true;
  constructor(private userService: UserService , private router: Router, private product: ProductService) {
  }
  ngOnInit(): void {
      this.userService.userAuthReload()
  }

  signup(value: UserSignup){
    this.userService.userSignUP(value)
  }
  signin(value: UserLogin){
    this.userService.userlogin(value)
      this.userService.userAuth.subscribe((result)=>{
        if(result){
          this.loginError =  result
        }else{
          this.localCartToRemoteCart()
        }
      })

   

    setTimeout(() => {
      this.loginError = false
    }, 3000);
  }

  loginOpen(){
    this.loginON = !this.loginON
  }

  async localCartToRemoteCart(){
    debugger
    try {
      let data = localStorage.getItem('localCart')
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
        if(data){
          
          let cartItems = JSON.parse(data)
          cartItems && cartItems?.forEach((product: product, index: number)=>{
            let cartItem : cart =  {...product, productId : product.id, userId: userId}
            delete cartItem.id
          setTimeout(async() => {
            let res = await this.product.addToCart(cartItem)
            if(cartItems.length == index+1){
              localStorage.removeItem('localCart')
            }
          }, 500);
          })
        }
        this.product.getCartList(userId)
    } catch (error: any) {
      console.log(error.message)
    }
    
  }

}
