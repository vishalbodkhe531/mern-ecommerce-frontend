export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
};

export type Product = {
  _id: string;
  name: string;
  photo: string;
  dob: string;
  price: number;
  stock: number;
  category: string;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
