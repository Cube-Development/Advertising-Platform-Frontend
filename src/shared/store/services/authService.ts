import { IToken } from "@entities/user";
import { baseApi } from "@shared/api";

type AuthParams = {
  authorization_code: string;
};

export const authorizatioAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTokens: build.mutation<IToken, AuthParams>({
      query: (BodyParams) => ({
        url: `/auth/token`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    logout: build.mutation<void, string>({
      query: (refrechToken) => ({
        url: `/auth/logout`,
        method: `POST`,
        body: {
          refresh_token: refrechToken,
        },
      }),
    }),
  }),
});
export const { useGetTokensMutation, useLogoutMutation } = authorizatioAPI;
