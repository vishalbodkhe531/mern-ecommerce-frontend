import {
  Bar,
  CartItem,
  Line,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
  orderTypes,
} from "./types";

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

export type allUserResponce = {
  success: boolean;
  user: User[];
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

export type statsResponce = {
  success: boolean;
  stats: Stats;
};

export type pieResponce = {
  success: boolean;
  charts: Pie;
};

export type barResponce = {
  success: boolean;
  charts: Bar;
};

export type lineResponce = {
  success: boolean;
  charts: Line;
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

export type allOrderResponse = {
  success: boolean;
  orders: orderTypes[];
};

export type orderDetailsResponse = {
  success: boolean;
  order: orderTypes;
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

export type newOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  shippingCharges: number;
  discount: number;
  total: number;
  tax: number;
  user: string;
};

export type updateOrderRequest = {
  userId: string;
  orderId: string;
};

export type deleteUserRequest = {
  userId: string;
  adminUserId: string;
};
