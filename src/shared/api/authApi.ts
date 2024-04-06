import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "@shared/store/services/authBaseQuery";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [],
});
