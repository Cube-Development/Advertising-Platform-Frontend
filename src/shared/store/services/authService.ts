import { baseApi } from "@shared/api";
import { IToken } from "@shared/types/tokens";

type AuthParams = {
  authorization_code: string;
};

export const authorizatioAPI = baseApi.injectEndpoints({
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
export const { useGetTokensMutation, useLogoutMutation } = authorizatioAPI;
