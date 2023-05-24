import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalService } from './Service/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  toggleCart = false;
  showNotificationAddCart = false;
  showNotificationRemoveCart = false;

  constructor(private local: LocalService) {}
  ngDoCheck() {
    this.local.activeEmitter.subscribe({
      next: (res) => {
        this.toggleCart = res;
      },
    });

    // show notifications
    this.local.addToCartNotifyEmitter.subscribe({
      next: (res) => {
        this.showNotificationAddCart = res;
        setTimeout(() => {
          this.showNotificationAddCart = false;
        }, 1000);
      },
    });

    this.local.removeFromCartNotifyEmitter.subscribe({
      next: (res) => {
        this.showNotificationRemoveCart = res;
        setTimeout(() => {
          this.showNotificationRemoveCart = false;
        }, 1000);
      },
    });
  }

  closeCart(event: any) {
    if (event.target.className === 'fixed_cart') {
      this.local.toggleCart = !this.local.toggleCart;
      this.toggleCart = this.local.toggleCart;
    }
  }
}
