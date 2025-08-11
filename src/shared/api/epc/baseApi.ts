import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_DIDOX_URL || "";

export const baseEpcApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  reducerPath: "baseEpcApi",
  endpoints: () => ({}),
});
