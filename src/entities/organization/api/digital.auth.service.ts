import { authEcpApi } from "@shared/api/epc/authApi";
import { IGetAccountEDO, IGetProfileEDO } from "../types";

export const digitalAuthAPI = authEcpApi.injectEndpoints({
  endpoints: (build) => ({
    getAccountEDO: build.query<IGetAccountEDO, void>({
      query: () => ({
        url: `/v1/account`,
        method: `GET`,
      }),
    }),

    getProfileEDO: build.query<IGetProfileEDO, void>({
      query: () => ({
        url: `/v1/profile`,
        method: `GET`,
      }),
    }),
    getProfileEDOMutation: build.mutation<IGetProfileEDO, void>({
      query: () => ({
        url: `/v1/profile`,
        method: `GET`,
      }),
    }),
  }),
});

export const {
  useGetAccountEDOQuery,
  useGetProfileEDOQuery,
  useGetProfileEDOMutationMutation,
} = digitalAuthAPI;
