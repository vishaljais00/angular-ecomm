import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private product: ProductService) {
    
  }

  productDetail: product | undefined
  productQuantity: number = 1

  ngOnInit(): void {
      const productId =   this.route.snapshot.paramMap.get('productId')
      productId && this.product.getProduct(parseInt(productId)).subscribe((data)=>{
        this.productDetail = data
      })
  }

 handleQuantity(val: string) {
  this.productQuantity = val === 'min'? (this.productQuantity > 0?  this.productQuantity - 1 : this.productQuantity) : this.productQuantity + 1 
 }
}
