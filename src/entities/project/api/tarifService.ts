import { ADV_TARIFF_ORDERS, authApi, BALANCE, USER_ME } from "@shared/api";
import { IBuyTariff, IChangeOrder } from "../types";

export const tarifAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    postBuyTarif: build.mutation<{ success: boolean }, IBuyTariff>({
      query: (BodyParams) => ({
        url: `/tariff/payment`,
        method: `POST`,
        body: BodyParams,
      }),
      invalidatesTags: [BALANCE, USER_ME],
    }),
    changeOrder: build.mutation<{ success: boolean }, IChangeOrder>({
      query: (BodyParams) => ({
        url: `/tariff/order/desire`,
        method: `PUT`,
        body: BodyParams,
      }),
      invalidatesTags: [ADV_TARIFF_ORDERS],
    }),
  }),
});

export const { usePostBuyTarifMutation, useChangeOrderMutation } = tarifAPI;
