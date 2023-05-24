import { Component } from '@angular/core';
import { LocalService } from 'src/app/Service/local.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  uniqueItems: any = [];
  newUniqueItems: any = [];
  count: any = {};
  totalPrice = 0;
  items = 0;
  constructor(private local: LocalService) {}
  ngOnInit() {
    this.local.removeDuplicates(this.count, this.uniqueItems);
    this.calcPrice();

    // localStorage issue of storing reference types and performing tasks like filter or making a array of unique elements doesnt work to get arround this the following is done
    let uniqueMap = new Map();
    this.uniqueItems.forEach((obj: any) => {
      let id = obj.id;
      uniqueMap.set(id, obj);
    });

    // Create a new array with unique objects
    this.newUniqueItems = Array.from(uniqueMap.values());
  }
  // calculate price of items
  calcPrice() {
    this.totalPrice = 0;
    this.items = this.local.cartItems.length;
    this.local.cartItems.forEach((val: any) => {
      this.totalPrice += +val.price;
    });
  }

  // change quantity of the cart items

  addQty(item: any, id: any) {
    this.count[id]++;
    this.local.cartItems.unshift(item);
    this.calcPrice();
  }
  subQty(item: any, id: any) {
    if (this.count[id] != 1) {
      this.count[id]--;
      // this.local.cartItems.shift(item);
      this.local.cartItems.splice(this.local.cartItems.indexOf(item), 1);
      this.calcPrice();
    }
  }
  removeItem(items: any) {
    // show notifications
    this.local.removeFromCartNotifyEmitter.next(true);
    this.local.removeItem(this.newUniqueItems, items);

    this.calcPrice();
  }

  showMessage() {
    alert(
      'This is just a dummy site. Go to the real amazon website to buy this product'
    );
  }
}
