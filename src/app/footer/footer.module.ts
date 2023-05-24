import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from './footer-home/footer-home.component';



@NgModule({
  declarations: [
    FooterHomeComponent
  ],
  imports: [
    CommonModule
  ],exports: [FooterHomeComponent]
})
export class FooterModule { }
