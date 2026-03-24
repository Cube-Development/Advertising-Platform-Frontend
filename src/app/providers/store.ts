import { userSlice } from "@entities/user";
import { catalogFilterSlice } from "@entities/project";
import { walletSlice } from "@entities/wallet";
import { dropdownMenuSlice } from "@shared/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi, authEcpApi, authEcpApi2, baseApi, baseEpcApi, baseEpcApi2 } from "@shared/api";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [catalogFilterSlice.reducerPath]: catalogFilterSlice.reducer,
  [walletSlice.reducerPath]: walletSlice.reducer,
  [dropdownMenuSlice.reducerPath]: dropdownMenuSlice.reducer,
  [authEcpApi.reducerPath]: authEcpApi.reducer,
  [authEcpApi2.reducerPath]: authEcpApi2.reducer,
  [baseEpcApi.reducerPath]: baseEpcApi.reducer,
  [baseEpcApi2.reducerPath]: baseEpcApi2.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        baseApi.middleware,
        authEcpApi.middleware,
        authEcpApi2.middleware,
        baseEpcApi.middleware,
        baseEpcApi2.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
