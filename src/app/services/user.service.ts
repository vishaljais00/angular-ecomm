import { EventEmitter, Injectable } from '@angular/core';
import { Signup } from '../interface/seller.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin, UserSignup } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  userAuth = new EventEmitter<boolean>(false)
  userSignUP(user: Signup){
    this.http.post('http://localhost:3000/users', user, {observe: 'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }

  userlogin(data: UserLogin){
    this.http.get<UserSignup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe: 'response'})
      .subscribe((data)=>{
        if(data && data.body && data.body.length > 0){
          localStorage.setItem('user', JSON.stringify(data.body[0]))
          this.userAuth.emit(false)
          this.router.navigate(['/'])
        }else{
          this.userAuth.emit(true)
        }
      })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }


}
