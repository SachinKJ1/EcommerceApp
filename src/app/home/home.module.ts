import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LandingComponent, CarouselComponent],
  imports: [CommonModule, HomeRoutingModule, MatIconModule, DragDropModule,SharedModule],
})
export class HomeModule {}
