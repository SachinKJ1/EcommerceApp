import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LocalService {
  toggleCart = false;

  // itemEmitter = new Subject<any>();

  searchEmitter = new Subject<any>();

  addToCartNotifyEmitter = new Subject<any>();

  removeFromCartNotifyEmitter = new Subject<any>();

  cartEmitter = new Subject<any>();

  cartItems: any = [];

  localStorage: any = [];

  activeEmitter = new Subject<boolean>();

  // state: any = [];

  localStage: any = [];

  constructor() {}

  get storedItems() {
    let storedValue = localStorage.getItem('val');
    this.localStorage = storedValue !== null ? JSON.parse(storedValue) : [];
    return this.localStorage;
  }

  get storedStage() {
    let storedValue = localStorage.getItem('state');
    this.localStage = storedValue !== null ? JSON.parse(storedValue) : [];
    return this.localStage;
  }

  removeDuplicates(count: any, uniqueItems: any) {
    this.cartItems.forEach((item: any) => {
      // this.totalPrice += +item.price;

      count[item.id] = count[item.id] ? count[item.id] + 1 : 1;

      if (!uniqueItems.includes(item)) {
        uniqueItems.push(item);
      }
    });
  }

  removeItem(uniqueItems: any, items: any) {
    // this.count[item.id] = 0;
    uniqueItems.splice(uniqueItems.indexOf(items), 1);
    // this.local.cartItems.splice(this.local.cartItems.indexOf(item), value);
    // this.itemEmitter.next(items);
    let arr = this.cartItems.filter((item: any) => item.id !== items.id);
    this.cartItems = arr;    
    // this.uniqueItems.indexOf(item);
  }
}
