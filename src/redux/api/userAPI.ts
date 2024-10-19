import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { messageResponce, userResponce } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

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
      }),
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: userResponce } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation } = userAPI;
