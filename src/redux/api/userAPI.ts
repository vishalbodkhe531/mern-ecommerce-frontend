import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  allUserResponce,
  deleteUserRequest,
  messageResponce,
  userResponce,
} from "../../types/api-types";
import { User } from "../../types/types";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
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
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<messageResponce, deleteUserRequest>({
      query: ({ userId, adminUserId }) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    allUsers: builder.query<allUserResponce, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
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

export const { useLoginMutation, useDeleteUserMutation, useAllUsersQuery } =
  userAPI;
