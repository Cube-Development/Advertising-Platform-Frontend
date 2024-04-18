import { authApi, baseApi } from "@shared/api";
import { ICart } from "@shared/types/cart";

interface AddChannelReq {
  guest_id?: string;
  channel_id: string;
  format: number;
  match?: number;
}

// Авторизованные запросы

export const authCartAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    readCommonCart: build.query<ICart, string>({
      query: () => ({
        url: `/cart/common`,
        method: `GET`,
      }),
    }),
    addToCommonCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/common/add`,
        method: `POST`,
        params: params,
      }),
    }),
    removeFromCommonCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/common/remove`,
        method: `POST`,
        params: params,
      }),
    }),
    saveCart: build.mutation<{ success: boolean }, void>({
      query: () => ({
        url: `/cart/save`,
        method: `POST`,
      }),
    }),
    transferPublic: build.mutation<{ success: boolean }, { guest_id: string }>({
      query: (params) => ({
        url: `/cart/transfer`,
        method: `POST`,
        params: params,
      }),
    }),
  }),
});

export const {
  useReadCommonCartQuery,
  useAddToCommonCartMutation,
  useRemoveFromCommonCartMutation,
  useSaveCartMutation,
  useTransferPublicMutation,
} = authCartAPI;

// Публичные запросы

export const publicCartAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    readPublicCart: build.query<ICart, { guest_id: string | undefined }>({
      query: (params) => ({
        url: `/cart/public`,
        method: `GET`,
        params: params,
      }),
    }),
    addToPublicCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/public/add`,
        method: `POST`,
        params: params,
      }),
    }),
    removeFromPublicCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/public/remove`,
        method: `POST`,
        params: params,
      }),
    }),
  }),
});

export const {
  useReadPublicCartQuery,
  useAddToPublicCartMutation,
  useRemoveFromPublicCartMutation,
} = publicCartAPI;
