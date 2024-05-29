import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "@shared/store/services/authBaseQuery";
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
} from "@shared/api/tags";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [
    CART,
    CATALOG,
    BLOGGER_CHANNELS,
    CART_PUB,
    BALANCE,
    BLOGGER_OFFERS,
    ADV_PROJECTS,
    LEGALS,
    CHAT,
  ],
});
