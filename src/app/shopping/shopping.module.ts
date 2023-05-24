import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,FormsModule
  ]
})
export class ShoppingModule { }
