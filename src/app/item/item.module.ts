import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemShowComponent } from './item-show/item-show.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ItemShowComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,SharedModule
  ]
})
export class ItemModule { }
