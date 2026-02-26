import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      credentials: "include", // for HttpOnly refresh token cookie
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
      register: builder.mutation({
        query: (data) => ({
          url: "/register",
          method: "POST",
          body: data,
        }),
      }),

      login: builder.mutation({
        query: (data) => ({
          url: "/auth",
          method: "POST",
          body: data,
        }),
      }),

      getProfile: builder.query({
        query: () => "/auth/me",
        providesTags: ["User"],
      }),

      logout: builder.mutation({
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
        invalidatesTags: ["User"],
      }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetProfileQuery,
    useLogoutMutation,
} = authApi;