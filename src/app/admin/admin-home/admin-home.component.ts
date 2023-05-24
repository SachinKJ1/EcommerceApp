import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/Service/local.service';
import { ProductsService } from 'src/app/Service/products.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  products: any = [];
  searchKey = '';
  spinnerStatus = false;
  errorMsg!: string | null;
  constructor(
    private prod: ProductsService,
    private local: LocalService,
    private route: Router
  ) {}
  ngOnInit() {
    this.spinnerStatus = true;
    this.prod.showAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.spinnerStatus = false;
      },
      error: (err) => {
        this.spinnerStatus = false;
        this.errorMsg = `Something went Wrong. Error message :${err}. Try again after some time.`;
      },
    });
  }

  ngDoCheck() {
    // listening for the search event
    this.local.searchEmitter.subscribe({
      next: (response) => {
        this.searchKey = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toEdit(product: any) {}

  deleteItem(id: any) {
    let result = confirm('Are you sure you want to delete this product');
    if (result == false) {
      return;
    }

    this.prod.deleteItems(id).subscribe({
      next: (response: any) => {
        this.prod.deleteProducts(id).subscribe({
          next: (res: any) => {
            alert('Product Deleted');
            this.prod.showAllProducts().subscribe({
              next: (response) => {
                this.products = response;
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
          error: (err: any) => {
            console.log(err.message);
          },
        });
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }
}
