import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductResponse,
  allProductResponse,
  categoriesResponse,
  deleteProductRequest,
  messageResponce,
  newProductRequest,
  searchProductRequest,
  searchProductResponse,
  updateProductRequest,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),

  tagTypes: ["product"],

  endpoints: (builder) => ({
    latestProducts: builder.query<allProductResponse, string>({
      query: () => "letest",
      providesTags: ["product"],
    }),

    allProducts: builder.query<allProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),

    categories: builder.query<categoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),

    searchProducts: builder.query<searchProductResponse, searchProductRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `search-product?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
      providesTags: ["product"],
    }),

    newProduct: builder.mutation<messageResponce, newProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),

    updateProduct: builder.mutation<messageResponce, updateProductRequest>({
      query: ({ formData, productId, userId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<messageResponce, deleteProductRequest>({
      query: ({ productId, userId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productAPI;
