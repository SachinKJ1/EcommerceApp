import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  active = 0;
  carouserlImages = [
    '../../../assets/images/carousel-Images/carousel-1.jpg',
    '../../../assets/images/carousel-Images/carousel-2.jpg',
    '../../../assets/images/carousel-Images/carousel-3.jpg',
    '../../../assets/images/carousel-Images/carousel-4.jpg',
  ];

  
  onLeftClick() {
    if (this.active === 0) {
      this.active = this.carouserlImages.length - 1;
    } else {
      this.active--;
    }
  }

  onRightClick() {
    if (this.active === this.carouserlImages.length - 1) {
      this.active = 0;
    } else {
      this.active++;
    }
  }
}
