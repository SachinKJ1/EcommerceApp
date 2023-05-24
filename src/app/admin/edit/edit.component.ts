import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Service/products.service';
import { ProductsSchema } from 'src/app/models/products-schema';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageValidation } from 'src/app/validators/image-validation';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  item: ProductsSchema = {};
  spinnerStatus = false;
  errorMsg!: string | null;
  editForm!: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private prod: ProductsService,
    private imageValid: ImageValidation,
    private Route: Router
  ) {}

  ngOnInit() {
    this.spinnerStatus = true;
    this.activeRoute.params.subscribe({
      next: (response: any) => {
        const { id } = response;
        console.log(id);
        this.prod.showItemDetails(id).subscribe({
          next: (response) => {
            console.log(response);
            this.item = response;
            this.editForm.get('description')?.setValue(this.item.description);
            this.editForm.get('ratings')?.setValue(this.item.rating?.ratings);
            this.editForm.get('overall')?.setValue(this.item.rating?.overall);
            this.editForm.get('discount')?.setValue(this.item.discount);
            this.editForm.get('price')?.setValue(this.item.price);
            this.editForm.get('productName')?.setValue(this.item.name);
            this.editForm.get('companyName')?.setValue(this.item.company);
            this.editForm.get('imageUrl')?.setValue(this.item.photo);

            // offers value pushing to form array
            this.item.offers?.forEach((val) => {
              const offers = new FormGroup({
                name: new FormControl(val.name, Validators.required),
                description: new FormControl(
                  val.description,
                  Validators.required
                ),
              });
              (<FormArray>this.editForm.get('offers')).push(offers);
            });

            // about value pushing to form array
            this.item.about?.forEach((val) => {
              const control = new FormControl(val, Validators.required);
              (<FormArray>this.editForm.get('about')).push(control);
            });

            // specs form array value pushing
            this.item.specs?.forEach((val) => {
              const specs = new FormGroup({
                spec: new FormControl(val.spec, Validators.required),
                value: new FormControl(val.value, Validators.required),
              });
              (<FormArray>this.editForm.get('specs')).push(specs);
            });

            console.log(this.editForm);
            // console.log(this.editForm.get('offers')?.get('1')?.get('name'));
            this.spinnerStatus = false;
          },
          error: (err) => {
            this.spinnerStatus = false;
            this.errorMsg = `Something went Wrong. Error message :${err}. Try again after some time.`;
          },
        });
      },
    });

    // FORM
    this.editForm = new FormGroup({
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
    console.log(this.item.id);
  }

  get aboutControls() {
    return (this.editForm.get('about') as FormArray).controls;
  }

  get specControls() {
    return (this.editForm.get('specs') as FormArray).controls;
  }

  get offerControls() {
    return (this.editForm.get('offers') as FormArray).controls;
  }

  onAddAbout() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.editForm.get('about')).push(control);
  }

  onAddSpecs() {
    const specs = new FormGroup({
      spec: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
    (<FormArray>this.editForm.get('specs')).push(specs);
  }

  onAddOffers() {
    const offers = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    (<FormArray>this.editForm.get('offers')).push(offers);
  }

  // removing the formcontrol from form array
  onRemoveOffers(i: number) {
    const offerArr: any = this.editForm.get('offers');
    // to ensure at least three offers are added for a product
    if (offerArr.length <= 3) {
      alert('atleast 3 offers should be added for a product');
      return;
    }
    offerArr.removeAt(i);
  }

  onRemoveSpecs(i: number) {
    const specsArr: any = this.editForm.get('specs');
    // to ensure at least ten specs are added for a product
    if (specsArr.length <= 10) {
      alert('atleast 10 specs should be added for a product');
      return;
    }
    specsArr.removeAt(i);
  }

  onRemoveAbout(i: number) {
    const aboutArr: any = this.editForm.get('about');
    // to ensure at least 3 about are added for a product
    if (aboutArr.length <= 3) {
      alert('atleast 3 sentences about the product is required');
      return;
    }
    aboutArr.removeAt(i);
  }

  editContact() {
    const update: ProductsSchema = {
      id: this.item.id,
      name: this.editForm.value.productName,
      description: this.editForm.value.description,
      photo: this.editForm.value.imageUrl,
      price: this.editForm.value.price,
      company: this.editForm.value.companyName,
      discount: this.editForm.value.discount,
      offers: [...this.editForm.value.offers],
      rating: {
        ratings: this.editForm.value.ratings,
        overall: this.editForm.value.overall,
      },
      specs: [...this.editForm.value.specs],
      about: [...this.editForm.value.about],
    };

    console.log(update);

    const updateSub: ProductsSchema = {
      id: this.item.id,
      name: this.editForm.value.productName,
      description: this.editForm.value.description,
      photo: this.editForm.value.imageUrl,
      price: this.editForm.value.price,
      rating: {
        ratings: this.editForm.value.ratings,
        overall: this.editForm.value.overall,
      },
      discount: this.editForm.value.discount,
    };

    // comparing two objects
    if (JSON.stringify(this.item) === JSON.stringify(update)) {
      alert('No Changed Values');
      return;
    }

    if (this.editForm.invalid) {
      alert('Invalid Form');
      return;
    }

    /* 
    editContact(id: any) {
    this.api.editContact(id, this.contact).subscribe({
      next: (res: any) => {
        this.editRouter.navigateByUrl('');
      },
    });
  } 
  */

    this.prod.editItem(this.item.id, update).subscribe({
      next: (res: any) => {
        this.prod.editProduct(this.item.id, updateSub).subscribe({
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
