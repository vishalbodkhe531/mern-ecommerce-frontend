import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reduser/userReducers";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reduser/cartReducers";
import { orderApi } from "./api/orderAPI";
import { dashboartApi } from "./api/dashboard";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboartApi.reducerPath]: dashboartApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderApi.middleware,
      dashboartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
