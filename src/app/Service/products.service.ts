import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsSchema } from '../models/products-schema';
import { Observable, exhaustMap, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Base_url = 'http://localhost:3000';
  Base_url = 'https://dataforecommercecrud.onrender.com'

  constructor(private http: HttpClient) {}

  showAllProducts() {
    return this.http.get(`${this.Base_url}/products`);
  }

  showItemDetails(id: string) {
    return this.http.get(`${this.Base_url}/items/${id}`);
  }

  // edit an existing item from the api
  editItem(id: any, product: ProductsSchema) {
    return this.http.put(`${this.Base_url}/items/${id}`, product);
    // .pipe(
    //   tap((val: any) => {
    //     this.http.put(`${this.Base_url}/products/${id}`, productSub);
    //     return val ;
    //   })
    // );
  }

  editProduct(id: any, productSub: ProductsSchema) {
    return this.http.put(`${this.Base_url}/products/${id}`, productSub);
  }

  // add an item to the api
  addItem(product: ProductsSchema) {
    return this.http.post(`${this.Base_url}/items`, product);
  }
  addProduct(productSub: ProductsSchema) {
    return this.http.post(`${this.Base_url}/products`, productSub);
  }

  //  // delete contact
  //  deleteContact(id: any) {
  //   return this.http.delete(`${this.BASE_URL}/contacts/${id}`);
  // }

  // delete an already existing api data
  deleteItems(id: any) {
    return this.http.delete(`${this.Base_url}/items/${id}`);
  }
  deleteProducts(id: any) {
    return this.http.delete(`${this.Base_url}/products/${id}`);
  }
}
