import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener } from '@angular/core';
import { LocalService } from 'src/app/Service/local.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css'],
})
export class HeaderHomeComponent {
  cartItems: any = [];
  searchKey = '';
  length = 0;
  constructor(private local: LocalService) {}
  ngOnInit() {
    let storedValue = localStorage.getItem('val');

    this.local.cartItems = this.local.storedItems;
  }
  drop(event: any) {
    // show notifications
    this.local.addToCartNotifyEmitter.next(true);
    // if items moved inside the same container
    if (event.previousContainer === event.container) {
      // only position should be changed
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // else transfer the item to the new container
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.local.cartEmitter.next(this.cartItems);

      this.local.cartItems.unshift(...this.cartItems);
      this.cartItems = [];
    }
  }
  ngDoCheck() {
    this.length = this.local.cartItems.length;
  }
  onInput() {
    console.log(this.searchKey);
    this.local.searchEmitter.next(this.searchKey);
  }

  cartToggle() {
    this.local.toggleCart = !this.local.toggleCart;
    this.local.activeEmitter.next(this.local.toggleCart);
    // this.local.cartItems = this.cartItems;
  }

  // stroring cart items to localstorage
  ngOnDestroy() {
    localStorage.setItem('val', JSON.stringify(this.local.cartItems));
  }
  // do some code before the whole page reloads
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    localStorage.setItem('val', JSON.stringify(this.local.cartItems));
  }
}
