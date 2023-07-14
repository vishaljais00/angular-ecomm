import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';
import {faTrash , faEdit} from  '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[] 
  constructor(private product: ProductService){

  }

  deleteIcon = faTrash
  editIcon = faEdit

  productMessage: string = ''

  ngOnInit(): void {
    this.productListArr();
  }

  deleteProduct(id: number){
    console.log("test id",id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = "Product is deleted"
      }
    })

    this.productListArr();
    setTimeout(()=>{
      this.productMessage = ''
    },3000);
  } 

  productListArr(){
    this.product.getProducts().subscribe((results)=>{
      console.log(results)
      this.productList = results;
    })
  }
  
}
