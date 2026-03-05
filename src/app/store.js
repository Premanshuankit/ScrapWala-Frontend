import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { listingApi } from "../features/listing/listingApi";
import { marketplaceApi } from "../features/marketplace/marketplaceApi";
import { transactionApi } from "../features/transaction/transactionApi";
import { sellerApi } from "../features/seller/sellerApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [marketplaceApi.reducerPath]: marketplaceApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, listingApi.middleware, 
    marketplaceApi.middleware, transactionApi.middleware, sellerApi.middleware),
});