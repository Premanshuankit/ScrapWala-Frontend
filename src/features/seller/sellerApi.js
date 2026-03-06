import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.user?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMySellRequests: builder.query({
      query: () => "/seller/requests",
      providesTags: ["SellRequests"],
    }),

    getSellerOrders: builder.query({
      query: () => "/seller/requests",
    }),
  }),
});

export const {
  useGetMySellRequestsQuery,
  useGetSellerOrdersQuery,
} = sellerApi;