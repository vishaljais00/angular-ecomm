import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, Signup } from '../interface/seller.interface';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {


  loginON : boolean = true;
  loginError: boolean = false
  constructor(private seller: SellerService, private router: Router){
    
  }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signup(value: Signup){
    this.seller.userSignUp(value)
  }

  
  login(value: Login){
    this.loginError = false
    this.seller.userLogin(value)
    this.seller.isloginError.subscribe((isError)=>{
      if(isError){
        this.loginError = true
      }
    })
  }

  loginOpen(){
    this.loginON = !this.loginON
  }

  
}
