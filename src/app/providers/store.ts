import { userSlice } from "@entities/user";
import { catalogFilterSlice } from "@entities/project";
import { walletSlice } from "@entities/wallet";
import { dropdownMenuSlice } from "@shared/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi, authEcpApi, baseApi, baseEpcApi } from "@shared/api";
import { createOrderSlice } from "@widgets/createOrder/model";
import { voiceAgentSyncSlice } from "@widgets/voice-agent/model/slice/sync-slice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [catalogFilterSlice.reducerPath]: catalogFilterSlice.reducer,
  [walletSlice.reducerPath]: walletSlice.reducer,
  [dropdownMenuSlice.reducerPath]: dropdownMenuSlice.reducer,
  [authEcpApi.reducerPath]: authEcpApi.reducer,
  [baseEpcApi.reducerPath]: baseEpcApi.reducer,
  [createOrderSlice.name]: createOrderSlice.reducer,
  [voiceAgentSyncSlice.name]: voiceAgentSyncSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        baseApi.middleware,
        authEcpApi.middleware,
        baseEpcApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
