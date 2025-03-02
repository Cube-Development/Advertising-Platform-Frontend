import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ADV_PROJECTS,
  BALANCE,
  BLOGGER_CHANNELS,
  BLOGGER_OFFERS,
  CART,
  CART_MANAGER,
  CART_PUB,
  CATALOG,
  CHAT,
  LEGALS,
  RECOMMEND_CARDS,
} from "@shared/api/tags";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: [
    CART_PUB,
    BLOGGER_CHANNELS,
    CART,
    CART_MANAGER,
    CATALOG,
    RECOMMEND_CARDS,
    BALANCE,
    BLOGGER_OFFERS,
    ADV_PROJECTS,
    LEGALS,
    CHAT,
  ],
});
