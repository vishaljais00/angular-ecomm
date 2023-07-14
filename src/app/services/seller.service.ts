import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from '../interface/seller.interface';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SellerService {

  isSellerLoggedIn :boolean = false 
  isloginError = new EventEmitter<boolean>(false)
  constructor(private httpClient: HttpClient , private router: Router) {}

  userSignUp(data: Signup) {
    this.httpClient
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((results) => {
        this.isSellerLoggedIn =true
        localStorage.setItem('seller', JSON.stringify(results.body))
        this.router.navigate(['seller-home'],  { queryParams: { id: 1 } })
      });
  }


  userLogin(data: Login) {
    this.httpClient
      .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((results: any) => {

        console.log("results", results);
        if(results && results.body.length > 0){
          console.warn("user logged in")
          this.isSellerLoggedIn =true
          localStorage.setItem('seller', JSON.stringify(results.body))
          this.router.navigate(['seller-home'],  { queryParams: { id: 1 } })
        }else{
          this.isloginError.emit(true)
        }
        
      });
  }
  
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn = true
      this.router.navigate(['seller-home'],  { queryParams: { id: 1 } })
    }
  }
  strx: string = 'jo';
}
