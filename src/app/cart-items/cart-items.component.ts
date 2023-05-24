import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { LocalService } from '../Service/local.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent {
  uniqueItems: any = [];
  newUniqueItems: any = [];
  count: any = {};

  constructor(private local: LocalService) {}
  ngOnInit() {
    // localStorage.setItem(
    //   'arr',
    //   JSON.stringify([{ id: 1 }, { id: 2 }, { id: 1 }])
    // );
    // let storedValue = localStorage.getItem('arr');
    // let arrStorage = storedValue !== null ? JSON.parse(storedValue) : [];
    // // let newArr = Array.from(new Set(arrStorage));

    // // Create a map to track unique values based on the 'id' property
    // let uniqueMap = new Map();
    // arrStorage.forEach((obj: any) => {
    //   let id = obj.id;
    //   uniqueMap.set(id, obj);
    // });

    // // Create a new array with unique objects
    // let newArr = Array.from(uniqueMap.values());
    // console.log(newArr);

    this.local.removeDuplicates(this.count, this.uniqueItems);

    // localStorage issue of storing reference types and performing tasks like filter or making a array of unique elements doesnt work to get arround this the following is done
    let uniqueMap = new Map();
    this.uniqueItems.forEach((obj: any) => {
      let id = obj.id;
      uniqueMap.set(id, obj);
    });

    // Create a new array with unique objects
    this.newUniqueItems = Array.from(uniqueMap.values());
  
  }

  // change quantity of the cart items

  addQty(item: any, id: any) {
    this.count[id]++;
    this.local.cartItems.unshift(item);
  }
  subQty(item: any, id: any) {
    if (this.count[id] != 1) {
      this.count[id]--;
      this.local.cartItems.splice(this.local.cartItems.indexOf(item), 1);
    }
  }
  removeItem(items: any) {
    // show notifications
    this.local.removeFromCartNotifyEmitter.next(true);

    this.local.removeItem(this.newUniqueItems, items);
  }
  closeCart() {
    this.local.toggleCart = !this.local.toggleCart;
    this.local.activeEmitter.next(this.local.toggleCart);
  }
  // ngOnDestroy() {
  //   localStorage.setItem('set', JSON.stringify(this.uniqueItems));
  // }
  // // do some code before the whole page reloads
  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: Event) {
  //   localStorage.setItem('set', JSON.stringify(this.uniqueItems));
  // }
}
