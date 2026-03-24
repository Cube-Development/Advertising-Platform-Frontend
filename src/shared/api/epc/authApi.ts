import { authBaseQuery, authBaseQuery2 } from "@entities/organization/api/authBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { DIGITAL_DOCUMENTS } from "./tags";

export const authEcpApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authEcpApi",
  endpoints: () => ({}),
  tagTypes: [DIGITAL_DOCUMENTS],
});

export const authEcpApi2 = createApi({
  baseQuery: authBaseQuery2,
  reducerPath: "authEcpApi2",
  endpoints: () => ({}),
  tagTypes: [DIGITAL_DOCUMENTS],
});
