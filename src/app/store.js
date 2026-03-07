import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { listingApi } from "../features/listing/listingApi";
import { marketplaceApi } from "../features/marketplace/marketplaceApi";
import { transactionApi } from "../features/transaction/transactionApi";
import { sellerApi } from "../features/seller/sellerApi";
import { inventoryApi } from "../features/inventory/inventoryApi";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [marketplaceApi.reducerPath]: marketplaceApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware, listingApi.middleware, 
    marketplaceApi.middleware, transactionApi.middleware, sellerApi.middleware, inventoryApi.middleware),    
});

export const persistor = persistStore(store);