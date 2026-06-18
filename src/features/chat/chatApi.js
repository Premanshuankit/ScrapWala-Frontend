import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ message, history }) => ({
        url: "/chat",
        method: "POST",
        body: { message, history },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
