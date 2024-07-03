import { authApi, baseApi } from "@shared/api";
import { CART, CART_PUB, CATALOG } from "@shared/api/tags";
import { languagesNum } from "@shared/config/languages";
import { ICart } from "@shared/types/cart";

interface AddChannelReq {
  guest_id?: string;
  project_id?: string;
  channel_id: string;
  format: number;
  match: number;
  language: languagesNum;
}

interface RemoveChannelReq {
  guest_id?: string;
  project_id?: string;
  channel_id: string;
  language: languagesNum;
}

interface ReadCartReq {
  language: languagesNum;
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
      providesTags: [CART_PUB, CART],
    }),
    addToCommonCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/common/add`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB, CART, CATALOG],
    }),
    removeFromCommonCart: build.mutation<ICart, RemoveChannelReq>({
      query: (params) => ({
        url: `/cart/common/remove`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB, CART, CATALOG],
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
    readPublicCart: build.query<ICart, ReadCartReq>({
      query: (params) => ({
        url: `/cart/public`,
        method: `GET`,
        params: params,
      }),
      providesTags: [CART_PUB, CART],
    }),
    addToPublicCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/public/add`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB, CART, CATALOG],
    }),
    removeFromPublicCart: build.mutation<ICart, RemoveChannelReq>({
      query: (params) => ({
        url: `/cart/public/remove`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB, CART, CATALOG],
    }),
  }),
});

export const {
  useReadPublicCartQuery,
  useAddToPublicCartMutation,
  useRemoveFromPublicCartMutation,
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
      providesTags: [CART_PUB, CART],
    }),
    addToManagerCart: build.mutation<ICart, AddChannelReq>({
      query: (params) => ({
        url: `/cart/project/add`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB, CART, CATALOG],
    }),
    removeFromManagerCart: build.mutation<ICart, RemoveChannelReq>({
      query: (params) => ({
        url: `/cart/project/remove`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [CART_PUB, CART, CATALOG],
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
