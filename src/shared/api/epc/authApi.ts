import { authBaseQuery } from "@entities/organization/api/authBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authEcpApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authEcpApi",
  endpoints: () => ({}),
});
