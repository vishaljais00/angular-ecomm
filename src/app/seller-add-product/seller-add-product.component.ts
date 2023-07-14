import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductMessage: string = ''
  constructor(private productService: ProductService){

  }


  addNewProduct(data: product){
    this.productService.addProduct(data).subscribe((result)=>{
      console.log("results", result);
      if(result){
        this.addProductMessage = 'Product successfully added'
      }
      setTimeout(() => {
        this.addProductMessage = ''
      }, 2000);
    })
  }


}
