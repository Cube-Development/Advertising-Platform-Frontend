import { authApi } from "@shared/api";
import { IChangeOrder } from "../types";

export interface getBuyTarifReq {
  tariff_ident: number;
  comment: string;
  links: string[];
  attached_files: IAttachedFiles[];
}

interface IAttachedFiles {
  content: string;
  content_type: number;
}

export const tarifAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    postBuyTarif: build.mutation<{ success: boolean }, getBuyTarifReq>({
      query: (BodyParams) => ({
        url: `/tariff/payment`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    changeOrder: build.mutation<{ success: boolean }, IChangeOrder>({
      query: (BodyParams) => ({
        url: `/tariff/order/desire`,
        method: `PUT`,
        body: BodyParams,
      }),
    }),
  }),
});

export const { usePostBuyTarifMutation, useChangeOrderMutation } = tarifAPI;
