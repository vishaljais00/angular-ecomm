import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private auth: SellerService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isSellerLoggedIn) {
      return true;
    }
    else if(localStorage.getItem('seller')){
      this.auth.isSellerLoggedIn = true
      return true;
    }else{
      return false;
    }
  }
}