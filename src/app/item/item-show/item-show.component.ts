import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Service/products.service';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.css'],
})
export class ItemShowComponent implements OnInit {
  item: any = {};
  spinnerStatus = false;
  errorMsg!: string | null;
  constructor(
    private activeRoute: ActivatedRoute,
    private prod: ProductsService
  ) {}

  ngOnInit() {
    this.spinnerStatus = true;

    this.activeRoute.params.subscribe({
      next: (response: any) => {
        const { id } = response;
        this.prod.showItemDetails(id).subscribe({
          next: (response) => {
            this.item = response;
            this.spinnerStatus = false;
          },
          error: (err) => {
            this.spinnerStatus = false;
            this.errorMsg = `Something went Wrong. Error message :${err}. Try again after some time.`;
          },
        });
      },
    });
  }
}
