import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Service/products.service';
import { ProductsSchema } from 'src/app/models/products-schema';
import { ImageValidation } from 'src/app/validators/image-validation';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  item!: any;
  id!: string;

  addForm!: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private prod: ProductsService,
    private imageValid: ImageValidation,
    private Route: Router
  ) {}

  ngOnInit() {
    this.prod.showAllProducts().subscribe({
      next: (response) => {
        this.item = response;
        this.id = this.item.length + 1;
      },
      error: (err) => {
        console.log(err);
      },
    });

    // FORM
    this.addForm = new FormGroup({
      description: new FormControl('', Validators.required),
      ratings: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      overall: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-5]\\.[0-9]$'),
      ]),
      discount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      productName: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),

      // custom validation
      imageUrl: new FormControl('', [
        Validators.required,
        this.imageValid.validate,
      ]),
      about: new FormArray([]),
      specs: new FormArray([]),
      offers: new FormArray([]),
    });

    // adding input fields on page load for about section
    let arrAbout = ['', '', '', '', ''];
    arrAbout.forEach((val) => {
      const control = new FormControl('', Validators.required);
      (<FormArray>this.addForm.get('about')).push(control);
    });

    // adding input fields for specs on page load
    let arrSpecs = ['', '', '', '', '', '', '', '', '', ''];
    arrSpecs.forEach((val) => {
      const specs = new FormGroup({
        spec: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
      });
      (<FormArray>this.addForm.get('specs')).push(specs);
    });

    // adding input fields for offers on page load

    let arrOffers = ['', '', ''];
    arrOffers.forEach((val) => {
      const offers = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      });
      (<FormArray>this.addForm.get('offers')).push(offers);
    });
  }

  // to show the form arrays in the template
  get aboutControls() {
    return (this.addForm.get('about') as FormArray).controls;
  }

  get specControls() {
    return (this.addForm.get('specs') as FormArray).controls;
  }

  get offerControls() {
    return (this.addForm.get('offers') as FormArray).controls;
  }

  // adding new input fields
  onAddAbout() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.addForm.get('about')).push(control);
  }

  onAddSpecs() {
    const specs = new FormGroup({
      spec: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
    (<FormArray>this.addForm.get('specs')).push(specs);
  }

  onAddOffers() {
    const offers = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    (<FormArray>this.addForm.get('offers')).push(offers);
  }

  // removing the formcontrol from form array
  onRemoveOffers(i: number) {
    const offerArr: any = this.addForm.get('offers');

    // to ensure at least three offers are added for a product
    if (offerArr.length <= 3) {
      alert('atleast 3 offers should be added for a product');
      return;
    }
    offerArr.removeAt(i);
  }

  onRemoveSpecs(i: number) {
    const specsArr: any = this.addForm.get('specs');

    // to ensure at least ten specs are added for a product
    if (specsArr.length <= 10) {
      alert('atleast 10 specs should be added for a product');
      return;
    }

    specsArr.removeAt(i);
  }

  onRemoveAbout(i: number) {
    const aboutArr: any = this.addForm.get('about');

    // to ensure at least 3 about are added for a product
    if (aboutArr.length <= 3) {
      alert('atleast 3 about the product sentences are required');
      return;
    }
    aboutArr.removeAt(i);
  }

  addContact() {
    const addProduct: ProductsSchema = {
      id: `item-${this.id}`,
      name: this.addForm.value.productName,
      description: this.addForm.value.description,
      photo: this.addForm.value.imageUrl,
      price: this.addForm.value.price,
      company: this.addForm.value.companyName,
      discount: this.addForm.value.discount,
      offers: [...this.addForm.value.offers],
      rating: {
        ratings: this.addForm.value.ratings,
        overall: this.addForm.value.overall,
      },
      specs: [...this.addForm.value.specs],
      about: [...this.addForm.value.about],
    };

    console.log(addProduct);

    const addProductSub: ProductsSchema = {
      id: `item-${this.id}`,
      name: this.addForm.value.productName,
      description: this.addForm.value.description,
      photo: this.addForm.value.imageUrl,
      price: this.addForm.value.price,
      rating: {
        ratings: this.addForm.value.ratings,
        overall: this.addForm.value.overall,
      },
      discount: this.addForm.value.discount,
    };

    if (this.addForm.invalid) {
      alert('Invalid Form');
      return;
    }
    console.log('form Submitted');

    this.prod.addItem(addProduct).subscribe({
      next: (res: any) => {
        this.prod.addProduct(addProductSub).subscribe({
          next: (res: any) => {
            this.Route.navigateByUrl('/admin');
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
