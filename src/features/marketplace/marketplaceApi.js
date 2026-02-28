import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marketplaceApi = createApi({
  reducerPath: "marketplaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth?.accessToken;
      const token = getState()?.auth?.user?.accessToken;
      console.log("Marketplace token:", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => "/listing",
    }),
  }),
});

export const { useGetAllListingsQuery } = marketplaceApi;