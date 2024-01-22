import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query'
// import reducers from './reducers'
import { cardsApi } from './reducers/cards';

const rootReducer = combineReducers({
  [cardsApi.reducerPath]: cardsApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsApi.middleware),
  })

  export type RootState = ReturnType<typeof rootReducer>;
