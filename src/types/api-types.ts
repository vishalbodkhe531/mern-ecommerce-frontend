import { Product, User } from "./types";

export type customeError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type messageResponce = {
  success: boolean;
  message: string;
};

export type userResponce = {
  success: boolean;
  user: User;
};

export type allProductResponse = {
  success: boolean;
  products: Product[];
};

export type categoriesResponse = {
  success: boolean;
  categories: string[];
};

export type searchProductResponse = allProductResponse & {
  totlePage: number;
};

export type searchProductRequest = {
  price: number;
  page: number;
  category: string;
  sort: string;
  search: string;
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};

export type newProductRequest = {
  id: string;
  formData: FormData;
};

export type updateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type deleteProductRequest = {
  userId: string;
  productId: string;
};
