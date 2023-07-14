import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: product | undefined 
  constructor(private route: ActivatedRoute, private product: ProductService){
      
  }

  ngOnInit(): void {
      let productId = this.route.snapshot.paramMap.get('id')
      productId && this.product.getProduct(parseInt(productId)).subscribe((data)=>{
        console.log("data", data);
        this.productData = data
      })

      
  }

  updateProductData(value: product){
   let productId = this.route.snapshot.paramMap.get('id')
   if (productId) value.id = parseInt(productId)
   this.product.updateProduct(value).subscribe((result)=>{
      if(result){
        console.log(result)
      }
   })
   
  }
}
