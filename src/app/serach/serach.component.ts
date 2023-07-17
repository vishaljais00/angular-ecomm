import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrls: ['./serach.component.css']
})
export class SerachComponent implements OnInit {

  searchedData : product[] = []
  constructor(private route: ActivatedRoute, private product: ProductService){
      
  }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query')
    query && this.product.saeachProducts(query).subscribe((data)=>{
      this.searchedData = data
    })
  }
}
