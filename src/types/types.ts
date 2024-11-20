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

export type orderItems = Omit<CartItem, "stock"> & { _id: string };

export type orderTypes = {
  _id: string;
  orderItems: orderItems[];
  shippingInfo: ShippingInfo;
  subTotle: number;
  shippingCharges: number;
  discount: number;
  total: number;
  tax: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
};

type countAndChange = {
  revenue: number;
  user: number;
  product: number;
  order: number;
};

type latestTransation = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: countAndChange;
  count: countAndChange;
  chart: {
    order: number[];
    revanue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransation: latestTransation[];
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type UserAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  userAgeGroup: UserAgeGroup;
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;

  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};

export type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
