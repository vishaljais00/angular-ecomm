import { Component, OnInit } from '@angular/core';
import { Signup } from '../interface/seller.interface';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor() {
    
  }
  ngOnInit(): void {
      
  }

  signup(value: Signup){
    console.warn(value)
  }

}
