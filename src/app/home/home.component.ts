import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  popularProductData: product[] = []
  trendyProducts: undefined | product[]
  constructor(private product: ProductService){
    
  }
  ngOnInit(): void {
      this.product.popularProducts().subscribe((data)=>{
        this.popularProductData = data
      }) 
      
      this.product.trendyProducts().subscribe((data)=>{
        this.trendyProducts = data
      })
  }
}
