export class ProductsSchema {
  id?: string;
  name?: string;
  description?: string;
  photo?: string;
  price?: string | any;
  company?: string;
  discount?: string |any;
  offers?: {
    name?: string;
    description?: string;
  }[];
  rating?: { ratings?: string; overall?: string };
  specs?: { spec?: string; value?: string }[];
  about?: string[];
}
