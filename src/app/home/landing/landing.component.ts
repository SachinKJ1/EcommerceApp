import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener } from '@angular/core';
import { take } from 'rxjs';
import { LocalService } from 'src/app/Service/local.service';
import { ProductsService } from 'src/app/Service/products.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  // cartItems: any = [];
  products: any = [];
  // subItems = this.products;
  searchKey = '';
  spinnerStatus = false;
  errorMsg!: string | null;

  constructor(private prod: ProductsService, private local: LocalService) {}
  ngOnInit() {
    this.spinnerStatus = true;
    this.prod.showAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.spinnerStatus = false;
        // if (this.local.storedStage.length === 0) {
        //   this.products = response;
        // } else {
        //   this.products = this.local.storedStage;
        // }
      },
      error: (err) => {
        this.spinnerStatus = false;
        this.errorMsg = `Something went wrong. Error message : ${err}. Please try again after some time.`;
        console.log(err);
      },
    });
  }

  ngDoCheck() {
    // to add the item back when removed from the cart
    // this.local.itemEmitter.subscribe({
    //   next: (response) => {
    //     if (!this.products.includes(response)) {
    //       this.products.unshift(response);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    // listening for the search event
    this.local.searchEmitter.subscribe({
      next: (response) => {
        this.searchKey = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // adding the dragged component back to the array
    this.local.cartEmitter.subscribe({
      next: (response) => {
        let [item] = response;
        let index = +item.id.slice(5) - 1;
        if (!this.products.includes(item)) {
          this.products.splice(index, 0, item);
        }
      },
    });
  }

  drop(event: any) {
    // console.log(event);
    // if items moved inside the same container
    if (event.previousContainer === event.container) {
      // only position should be changed
      // moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    } else {
      // else transfer the item to the new container
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // this.products = this.subItems;
    }
  }

  // adding to the cart and removing the item from the array
  addToCart(product: any) {
    // show notifications
    this.local.addToCartNotifyEmitter.next(true);

    this.local.cartItems.unshift(product);
    // this.products.splice(this.products.indexOf(product), 1);
  }

  // ngOnDestroy() {
  //   // this.local.state = this.products;
  //   localStorage.setItem('state', JSON.stringify(this.products));
  // }
  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: Event) {
  //   localStorage.setItem('state', JSON.stringify(this.products));
  //   // Your logic before the page unloads/reloads
  // }
}
