import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "@shared/store/services/authBaseQuery";
import { BALANCE, BLOGGER_CHANNELS, CART, CART_PUB } from "@shared/api/tags";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [CART, BLOGGER_CHANNELS, CART_PUB, BALANCE],
});
