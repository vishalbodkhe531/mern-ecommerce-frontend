import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { messageResponce } from "../../types/api-types";
import { User } from "../../types/types";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<messageResponce, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation } = userAPI;
