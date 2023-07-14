import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: product){
    return this.http.post('http://localhost:3000/products', data);
  }

  getProducts(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: number){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: product){
    console.log("data", data);
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`, data);
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`);
  }

  saeachProducts(query: string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
}
