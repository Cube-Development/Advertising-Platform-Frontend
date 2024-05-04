import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ADV_PROJECTS,
  BALANCE,
  BLOGGER_CHANNELS,
  BLOGGER_OFFERS,
  CART,
  CART_PUB,
  CATALOG,
  LEGALS,
} from "@shared/api/tags";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: [
    CART_PUB,
    BLOGGER_CHANNELS,
    CART,
    CATALOG,
    BALANCE,
    BLOGGER_OFFERS,
    ADV_PROJECTS,
    LEGALS,
  ],
});
