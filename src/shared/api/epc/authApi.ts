import { authBaseQuery } from "@entities/organization/api/authBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { DIGITAL_DOCUMENTS } from "./tags";

export const authEcpApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authEcpApi",
  endpoints: () => ({}),
  tagTypes: [DIGITAL_DOCUMENTS],
});
