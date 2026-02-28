import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listingApi = createApi({
  reducerPath: "listingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user.accessToken;
        console.log('tokennnnv', token)

        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
      },
  }),
  
  endpoints: (builder) => ({
    createListing: builder.mutation({
      query: (data) => ({
        url: "/listing",
        method: "POST",
        body: data,
      }),
    }),

    createAllListing: builder.mutation({
      query: (data) => ({
        url: "/listing/createAllListing",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useCreateListingMutation,
  useCreateAllListingMutation,
} = listingApi;