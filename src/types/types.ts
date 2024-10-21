export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
}

export interface Product {
  _id: string;
  name: string;
  photo: string;
  dob: string;
  price: number;
  stock: number;
}
