import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.user?.accessToken;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["SellRequest", "Order"],

  endpoints: (builder) => ({
    createSellRequest: builder.mutation({
      query: (body) => ({
        url: "/seller",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SellRequest"],
    }),

    getSellerRequests: builder.query({
      query: () => "/seller/my-requests",
      providesTags: ["SellRequest"],
    }),

    getIncomingRequests: builder.query({
      query: () => "/seller/incoming",
      providesTags: ["SellRequest"],
    }),

    rejectSellRequest: builder.mutation({
      query: (id) => ({
        url: `/seller/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["SellRequest"],
    }),

    createOrder: builder.mutation({
      query: (sellRequestId) => ({
        url: `/order/${sellRequestId}`,
        method: "POST",
      }),
      invalidatesTags: ["SellRequest", "Order"],
    }),

    getBuyerOrders: builder.query({
      query: () => "/order/buyer",
      providesTags: ["Order"],
    }),

    getSellerOrders: builder.query({
      query: () => "/order/seller",
      providesTags: ["Order"],
    }),

  }),
});

export const {
  useCreateSellRequestMutation,
  useGetSellerRequestsQuery,
  useGetIncomingRequestsQuery,
  useRejectSellRequestMutation,
  useCreateOrderMutation,
  useGetBuyerOrdersQuery,
  useGetSellerOrdersQuery,
} = transactionApi;