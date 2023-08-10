import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  cartData = new EventEmitter<product[]>();

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  getProducts() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: number) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: product) {
    console.log('data', data);
    return this.http.put<product>(
      `http://localhost:3000/products/${data.id}`,
      data
    );
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`);
  }

  saeachProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  checkProductInCart(arr: product[], data: product) {
    var found = arr.find(function (element) {
      return element.id === data.id;
    });

    return found;
  }

  localAddtoCart(data: product) {
    let cartData = [];
    var localCart = localStorage.getItem('localCart');
    if (!localCart) {
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    } else {
      cartData = JSON.parse(localCart);
      let indexData = null;
      cartData.forEach((item: any, index: number) => {
        if (item.id == data.id) {
          indexData = index;
        }
      });

      if (indexData !== null) {
        cartData[indexData].quantity += data.quantity;
      } else {
        cartData.push(data);
      }
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFormCart(productID: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => item.id !== productID);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  async addToCart(cartData: cart): Promise<any> {
    try {
      // find if user has that item in cart or not
      let existingCartData: cart[] = [];
      let res: cart[] | undefined = await this.http
        .get<cart[]>(
          `http://localhost:3000/cart?productId=${cartData.productId}&userId=${cartData.userId}`
        )
        .toPromise();
      if (res && res?.length > 0) {
        console.log('In update');
        let cartId = res[0].id;
        cartData.quantity = cartData.quantity + res[0].quantity;
        let updatedRes = await this.http
          .put(`http://localhost:3000/cart/${cartId}`, cartData)
          .toPromise();
      } else {
        console.log('In add');
        let createdRes = await this.http
          .post(`http://localhost:3000/cart`, cartData)
          .toPromise();
      }

      return res;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  getCartList(userId: number) {
    console.log("userId", userId)
      this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userId}`, {observe: 'response'}).subscribe((data: any)=>{
        if(data && data.body){
          this.cartData.emit(data.body);
        }
      })
  }
}
