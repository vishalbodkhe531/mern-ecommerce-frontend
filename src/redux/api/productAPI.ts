import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allProductResponse,
  categoriesResponse,
  searchProductRequest,
  searchProductResponse,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),

  endpoints: (builder) => ({
    latestProducts: builder.query<allProductResponse, string>({
      query: () => "letest",
    }),

    allProducts: builder.query<allProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),

    categories: builder.query<categoriesResponse, string>({
      query: () => `categories`,
    }),

    searchProducts: builder.query<searchProductResponse, searchProductRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `search-product?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
} = productAPI;
