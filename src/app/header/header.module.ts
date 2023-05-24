import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderHomeComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,MatIconModule,DragDropModule,FormsModule
  ],
  exports:[HeaderHomeComponent]
})
export class HeaderModule { }
