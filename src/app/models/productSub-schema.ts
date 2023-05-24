export class ProductsSchema {
  id?: string;
  name?: string;
  description?: string;
  photo?: string;
  price?: string | any;

  discount?: string | any;

  rating?: { ratings?: string; overall?: string };
}
