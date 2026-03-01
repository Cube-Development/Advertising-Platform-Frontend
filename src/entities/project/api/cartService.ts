import {
  authApi,
  baseApi,
  CART,
  CART_MANAGER,
  CART_PUB,
  CART_PUB_SHORT,
  CART_SHORT,
  RECOMMEND_CARDS,
} from "@shared/api";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { cartStatusFilter } from "../config";
import { ICart } from "../types";

interface AddChannelReq {
  guest_id?: string;
  project_id?: string;
  channel_id: string;
  format: number;
  match?: number;
  language: ENUM_LANGUAGES_NUM;
}

interface RemoveChannelReq {
  guest_id?: string;
  project_id?: string;
  channel_id: string;
  language: ENUM_LANGUAGES_NUM;
}

interface ReadCartReq {
  language?: ENUM_LANGUAGES_NUM;
  guest_id?: string;
  project_id?: string;
}

// Авторизованные запросы

export const authCartAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    readCommonCart: build.query<ICart, ReadCartReq>({
      query: (params) => ({
        url: `/cart/common`,
        method: `GET`,
        params: params,
      }),
      providesTags: [CART],
    }),
    readCommonCartShort: build.query<ICart, void>({
      query: () => ({
        url: `/cart/common/short`,
        method: `GET`,
      }),
      providesTags: [CART_SHORT],
    }),
    addToCommonCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/common/add`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_SHORT, RECOMMEND_CARDS, CART],
    }),
    removeFromCommonCart: build.mutation<ICart, RemoveChannelReq>({
      query: (params) => ({
        url: `/cart/common/remove`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_SHORT, RECOMMEND_CARDS, CART],
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
    checkCart: build.mutation<
      { state: cartStatusFilter },
      { project_id: string }
    >({
      query: (params) => ({
        url: `/cart/project-common/check`,
        method: `GET`,
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
  useCheckCartMutation,
  useReadCommonCartShortQuery,
} = authCartAPI;

// Публичные запросы

export const publicCartAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    readPublicCart: build.query<ICart, ReadCartReq>({
      query: (params) => ({
        url: `/cart/public`,
        method: `GET`,
        params: params,
      }),
      providesTags: [CART_PUB],
    }),
    readPublicCartShort: build.query<ICart, ReadCartReq>({
      query: (params) => ({
        url: `/cart/public/short`,
        method: `GET`,
        params: params,
      }),
      providesTags: [CART_PUB_SHORT],
    }),
    addToPublicCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/public/add`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB_SHORT, RECOMMEND_CARDS, CART_PUB],
    }),
    removeFromPublicCart: build.mutation<ICart, RemoveChannelReq>({
      query: (params) => ({
        url: `/cart/public/remove`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB_SHORT, RECOMMEND_CARDS, CART_PUB],
    }),
  }),
});

export const {
  useReadPublicCartQuery,
  useAddToPublicCartMutation,
  useRemoveFromPublicCartMutation,
  useReadPublicCartShortQuery,
} = publicCartAPI;

// Манагерские запросы

export const managerCartAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    readManagerCart: build.query<ICart, ReadCartReq>({
      query: (params) => ({
        url: `/cart/project`,
        method: `GET`,
        params: params,
      }),
      providesTags: [CART_MANAGER],
    }),
    addToManagerCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/project/add`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_MANAGER, RECOMMEND_CARDS],
    }),
    removeFromManagerCart: build.mutation<ICart, RemoveChannelReq>({
      query: (params) => ({
        url: `/cart/project/remove`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_MANAGER, RECOMMEND_CARDS],
    }),
    // saveCart: build.mutation<{ success: boolean }, void>({
    //   query: () => ({
    //     url: `/cart/save`,
    //     method: `POST`,
    //   }),
    // }),
  }),
});

export const {
  useReadManagerCartQuery,
  useAddToManagerCartMutation,
  useRemoveFromManagerCartMutation,
} = managerCartAPI;
