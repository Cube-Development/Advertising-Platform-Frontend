import { IToken, roles } from "@entities/user";
import { authApi, baseApi } from "@shared/api";
import { languagesNum } from "@shared/config";

type AuthParams = {
  authorization_code: string;
};

type RegisterReq = {
  email: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: roles;
  language: languagesNum;
};

type RegisterRes = {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: roles;
  language: languagesNum;
};

type LoginReq = {
  username: string;
  password: string;
};

export const authorizationAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterRes, RegisterReq>({
      query: (BodyParams) => ({
        url: `/auth/register`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    login: build.mutation<string, LoginReq>({
      query: (BodyParams) => {
        const urlEncodedBody = new URLSearchParams({
          username: BodyParams.username,
          password: BodyParams.password,
        });
        return {
          url: `/auth/jwt/login`,
          method: `POST`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedBody.toString(),
          credentials: "include",
        };
      },
    }),
    getTokens: build.mutation<IToken, AuthParams>({
      query: (BodyParams) => ({
        url: `/auth/token`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});
export const { useGetTokensMutation, useLoginMutation, useRegisterMutation } =
  authorizationAPI;

export const logoutAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<string, void>({
      query: (BodyParams) => ({
        url: `/auth/jwt/logout`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});

export const { useLogoutMutation } = logoutAPI;
