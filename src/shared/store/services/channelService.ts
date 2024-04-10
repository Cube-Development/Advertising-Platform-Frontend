import { authApi } from "@shared/api";
import { platformStatus } from "@shared/config/platformFilter";
import {
  IAddChannelData,
  IAddChannelIdentification,
} from "@shared/types/platform";

export const channelAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createCode: build.query<{ verification_code: number }, void>({
      query: () => ({
        url: `/channel/create/code`,
        method: `POST`,
      }),
    }),
    channelVerify: build.mutation<
      { insertion_code: string },
      IAddChannelIdentification
    >({
      query: (BodyParams) => ({
        url: `/channel/verify`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    createChannel: build.mutation<{ status: platformStatus }, IAddChannelData>({
      query: (BodyParams) => ({
        url: `/channel/create`,
        method: `POST`,
        body: BodyParams,
      }),
    }),

    // getBalance: build.query<PaymentDepositResponse, void>({
    //   query: () => `/wallet/balance`,
    // }),
  }),
});

export const {
  useChannelVerifyMutation,
  useCreateChannelMutation,
  useCreateCodeQuery,
} = channelAPI;
