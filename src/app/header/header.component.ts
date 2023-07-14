import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { SellerService } from '../services/seller.service';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private seller: SellerService, private product: ProductService){

  }

  menuType: string = '';
  sellerName: string = '';
  serachResult: product[] = []

  ngOnInit():void{
    this.router.events.subscribe((value: any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          this.menuType = 'seller'
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.username
        }else{
          this.menuType = 'default'
        }
      }
    })
  }

  searchProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLTextAreaElement;
      if(element.value != ''){
        this.product.saeachProducts(element.value).subscribe((data)=>{
          if (data.length > 5) data.length = 5;
          this.serachResult = data

        })
      }else{
        this.serachResult = []
      }
      
    }
  }

  logout() {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }
}
