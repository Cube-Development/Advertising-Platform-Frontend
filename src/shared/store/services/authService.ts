import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IToken } from "@shared/types/tokens";

type AuthParams = {
  authorization_code: string;
};

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "/auth",
  }),
  endpoints: (build) => ({
    getTokens: build.mutation<IToken, AuthParams>({
      query: (BodyParams) => ({
        url: `/token`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    logout: build.mutation<void, string>({
      query: (refrechToken) => ({
        url: `/logout`,
        method: `POST`,
        body: {
          refresh_token: refrechToken,
        },
      }),
    }),
  }),
});
