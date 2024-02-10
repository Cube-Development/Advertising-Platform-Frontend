import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./services/authService";
import userReducer from "./reducers/userSlice"
import { legalAPI } from "./services/legalService";


const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [legalAPI.reducerPath]: legalAPI.reducer,
  userReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware, legalAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];