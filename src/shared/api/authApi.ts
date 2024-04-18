import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "@shared/store/services/authBaseQuery";
import { CART } from "@shared/store/tags";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [CART],
});
