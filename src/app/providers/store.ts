import { userSlice } from "@entities/user";
import { catalogFilterSlice } from "@entities/project";
import {
  promocodeListener,
  promocodeSlice,
  walletSlice,
} from "@entities/wallet";
import { dropdownMenuSlice } from "@shared/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  authApi,
  authEcpApi,
  authEcpApi2,
  baseApi,
  baseEpcApi,
  baseEpcApi2,
} from "@shared/api";
import { analyticsMiddleware } from "../analytics/analytics.middleware";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [catalogFilterSlice.reducerPath]: catalogFilterSlice.reducer,
  [walletSlice.reducerPath]: walletSlice.reducer,
  [promocodeSlice.reducerPath]: promocodeSlice.reducer,
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
      getDefaultMiddleware()
        .prepend(promocodeListener.middleware)
        .concat(
          authApi.middleware,
          baseApi.middleware,
          authEcpApi.middleware,
          authEcpApi2.middleware,
          baseEpcApi.middleware,
          baseEpcApi2.middleware,
          // Аналитика поведения — последней: видит экшены после всех API (спека 005 FR-006)
          analyticsMiddleware,
        ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
