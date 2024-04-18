import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CART_PUB } from "@shared/store/tags";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: [CART_PUB],
});
