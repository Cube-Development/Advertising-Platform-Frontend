import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./services/authService";
import userReducer from "./reducers/userSlice";
import filterReducer from "./reducers/filterSlice";
import { legalAPI } from "./services/legalService";
import { walletAPI } from "./services/walletService";

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [legalAPI.reducerPath]: legalAPI.reducer,
  [walletAPI.reducerPath]: walletAPI.reducer,
  userReducer,
  filterReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        legalAPI.middleware,
        walletAPI.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
