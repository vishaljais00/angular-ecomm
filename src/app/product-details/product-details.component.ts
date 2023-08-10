import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../interface/product.interface';

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
  removeCarts: boolean = false;

  ngOnInit(): void {

      const productId =   this.route.snapshot.paramMap.get('productId')
      productId && this.product.getProduct(parseInt(productId)).subscribe((data)=>{
        this.productDetail = data
      })
      let cartData = localStorage.getItem('localCart');
        if(productId && cartData){
          let items = JSON.parse(cartData);
          let deatilItemExist = items.filter((item: { id: string; }) => item.id == productId)
          if(deatilItemExist.length){
            this.removeCarts = true
          }else{
            this.removeCarts = false
          }
        }

  }

 handleQuantity(val: string) {
  this.productQuantity = val === 'min'? (this.productQuantity > 0?  this.productQuantity - 1 : this.productQuantity) : this.productQuantity + 1 
 }



 async AddtoCart() {

  try {
    if(this.productDetail){
      this.productDetail.quantity  = this.productQuantity
      if(!localStorage.getItem('user')){
        this.product.localAddtoCart(this.productDetail)
        this.removeCarts = true;
      }else{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.productDetail,
          userId,
          productId: this.productDetail.id
        }
        delete cartData.id
        // 
        const res = await this.product.addToCart(cartData)
        console.warn("cartData",res);
        
      }
     }
  } catch (error: any) {
    console.log(error.message)
  }
 
 }

 removeItemFormCart(productID: number){
  let cartData = localStorage.getItem('localCart')
  if(cartData){
    let items: product[] = JSON.parse(cartData)
    items = items.filter((item: product)=> item.id !== productID)

  } 
 }
 

 removeCart(productID: number){
    this.product.removeItemFormCart(productID)
    this.removeCarts = false
  } 
}