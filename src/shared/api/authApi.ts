import { authBaseQuery } from "@entities/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ADV_PROJECTS,
  BALANCE,
  BLOGGER_CHANNELS,
  BLOGGER_OFFERS,
  CART,
  CART_PUB,
  CATALOG,
  CHAT,
  LEGALS,
  MANAGER_PROJECTS,
  RECOMMEND_CARDS,
} from "@shared/api/tags";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [
    CART,
    CATALOG,
    RECOMMEND_CARDS,
    BLOGGER_CHANNELS,
    CART_PUB,
    BALANCE,
    BLOGGER_OFFERS,
    ADV_PROJECTS,
    MANAGER_PROJECTS,
    LEGALS,
    CHAT,
  ],
});
