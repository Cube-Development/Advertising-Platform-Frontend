import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api2.didox.uz";

export const baseEpcApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  reducerPath: "baseEpcApi",
  endpoints: () => ({}),
});
