export type AddProductData = {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
};

export type Product = AddProductData & {
  _id: string;
  rating: number;
  numReviews: number;
};

export type ProductList = Product[];
