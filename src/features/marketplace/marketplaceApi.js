import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marketplaceApi = createApi({
  reducerPath: "marketplaceApi",
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

  tagTypes: ["Listings"],

  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: ({ page = 1, limit = 10, shopname = "", scrapType = "", firstname = "", city = "", pincode = "" }) => ({
        url: "/listing",
        params: { page, limit, shopname, scrapType, firstname, city, pincode },
      }),

      // Let RTK auto-handle cache key correctly
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { shopname = "", scrapType = "", firstname = "", city = "", pincode = "" } = queryArgs;
        return { endpointName, shopname, scrapType, firstname, city, pincode };
      },

      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) {
          return newData;
        }

        currentCache.data.push(...newData.data);
        currentCache.currentPage = newData.currentPage;
        currentCache.totalPages = newData.totalPages;
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.shopname !== previousArg?.shopname ||
          currentArg?.scrapType !== previousArg?.scrapType ||
          currentArg?.firstname !== previousArg?.firstname ||
          currentArg?.city !== previousArg?.city ||
          currentArg?.pincode !== previousArg?.pincode 
        );
      },
    }),
  }),
});

export const { useGetAllListingsQuery } = marketplaceApi;
