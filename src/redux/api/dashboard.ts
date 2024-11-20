import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  barResponce,
  lineResponce,
  pieResponce,
  statsResponce,
} from "../../types/api-types";

export const dashboartApi = createApi({
  reducerPath: "dashboartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<statsResponce, string>({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),

    pie: builder.query<pieResponce, string>({
      query: (id) => `pie?id=${id}`,
      keepUnusedDataFor: 0,
    }),

    bar: builder.query<barResponce, string>({
      query: (id) => `bar?id=${id}`,
      keepUnusedDataFor: 0,
    }),

    line: builder.query<lineResponce, string>({
      query: (id) => `line?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useBarQuery, usePieQuery, useStatsQuery, useLineQuery } =
  dashboartApi;
