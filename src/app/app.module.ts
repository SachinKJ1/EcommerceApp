import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from './header/header.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { FormsModule } from '@angular/forms';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [AppComponent, CartItemsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HeaderModule,
    DragDropModule,
    FormsModule,FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
