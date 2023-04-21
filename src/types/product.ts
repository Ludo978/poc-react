export type ProductDto = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type ProductsDto = {
  products: ProductDto[];
  count?: number;
};
