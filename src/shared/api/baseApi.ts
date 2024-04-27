import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BALANCE, BLOGGER_CHANNELS, CART, CART_PUB } from "@shared/api/tags";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: [CART_PUB, BLOGGER_CHANNELS, CART, BALANCE],
});
