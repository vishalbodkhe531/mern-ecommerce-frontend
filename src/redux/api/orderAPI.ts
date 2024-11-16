import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allOrderResponse,
  messageResponce,
  newOrderRequest,
  orderDetailsResponse,
  updateOrderRequest,
} from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/orders/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<messageResponce, newOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),

    myOrders: builder.query<allOrderResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["order"],
    }),

    allOrders: builder.query<allOrderResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["order"],
    }),

    orderDetails: builder.query<orderDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["order"],
    }),

    updateOrder: builder.mutation<messageResponce, updateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),

    deleteOrder: builder.mutation<messageResponce, updateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useAllOrdersQuery,
  useMyOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;
