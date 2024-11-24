import { authApi } from "@shared/api";
import { IViewWallet } from "../types";

export const viewCommonAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewTransactions: build.query<IViewWallet, void>({
      query: () => ({
        url: "/view/transaction",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetViewTransactionsQuery } = viewCommonAPI;
