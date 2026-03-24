import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_DIDOX_URL || "";
const baseUrl2 = import.meta.env.VITE_BASE_DIDOX_URL_2 || "";

export const baseEpcApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  reducerPath: "baseEpcApi",
  endpoints: () => ({}),
});

export const baseEpcApi2 = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl2,
  }),
  reducerPath: "baseEpcApi2",
  endpoints: () => ({}),
});
