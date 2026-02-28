import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { listingApi } from "../features/listing/listingApi";
import { marketplaceApi } from "../features/marketplace/marketplaceApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [marketplaceApi.reducerPath]: marketplaceApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, listingApi.middleware, marketplaceApi.middleware),
});