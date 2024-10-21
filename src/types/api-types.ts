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
