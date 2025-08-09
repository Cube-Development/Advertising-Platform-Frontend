import { baseEpcApi } from "@shared/api/epc/baseApi";
import {
  IGetTimestampRequest,
  IGetTimestampResponse,
  IGetTokenRequest,
  IGetTokenResponse,
  ISignUpRequest,
} from "../types";

export const digitalBaseAPI = baseEpcApi.injectEndpoints({
  endpoints: (build) => ({
    getTimestamp: build.mutation<IGetTimestampResponse, IGetTimestampRequest>({
      query: (BodyParams) => ({
        url: `/v1/dsvs/timestamp`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getTokenByCertificate: build.mutation<IGetTokenResponse, IGetTokenRequest>({
      query: (BodyParams) => ({
        url: `/v1/auth/${BodyParams?.PNFL}/token/${BodyParams?.lang}`,
        method: `POST`,
        body: {
          signature: BodyParams?.signature,
        },
      }),
    }),
    getTokenByPassword: build.mutation<IGetTokenResponse, IGetTokenRequest>({
      query: (BodyParams) => ({
        url: `/v1/auth/${BodyParams?.PNFL}/password/${BodyParams?.lang}`,
        method: `POST`,
        body: {
          password: BodyParams?.password,
        },
      }),
    }),
    signUp: build.mutation<IGetTokenResponse, ISignUpRequest>({
      query: (BodyParams) => ({
        url: `/v1/auth/signup`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});

export const {
  useGetTimestampMutation,
  useGetTokenByCertificateMutation,
  useGetTokenByPasswordMutation,
  useSignUpMutation,
} = digitalBaseAPI;
