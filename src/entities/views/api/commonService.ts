import { authApi, VIEWS_MANAGER } from "@shared/api";
import { IViewWallet } from "../types";

export const viewCommonAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewTransactions: build.query<IViewWallet, void>({
      query: () => ({
        url: "/view/transaction",
        method: "GET",
      }),
      providesTags: [VIEWS_MANAGER],
    }),
  }),
});

export const { useGetViewTransactionsQuery } = viewCommonAPI;
