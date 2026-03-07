import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.accessToken;
      console.log('token from inventory :', token)

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getInventory: builder.query({
      query: () => "/inventory",
    }),
    createInventory: builder.mutation({
      query: (data) => ({
        url: "/inventory",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useGetInventoryQuery,
  useCreateInventoryMutation,
} = inventoryApi;