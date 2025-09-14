import { authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import {
  IAdminTransactionInfo,
  IAdminTransactions,
  IGetAdminTransactionsReq,
} from "../types";

export const adminTransactionsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminTransactions: build.query<
      IAdminTransactions,
      IGetAdminTransactionsReq
    >({
      query: (params) => ({
        url: `/adv-admin/transactions`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: IAdminTransactions, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
            response?.transactions?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.ADMIN_TRANSACTIONS,
        };
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast: newItems?.transactions.length === newItems?.elements,
          };
        }

        const newTransactions = [
          ...currentCache?.transactions,
          ...newItems?.transactions,
        ];
        return {
          ...newItems,
          isLast: newTransactions.length === newItems.elements,
          transactions: newTransactions,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getAdminTransactionInfo: build.query<IAdminTransactionInfo, { id: string }>(
      {
        query: (params) => ({
          url: `/adv-admin/transactions/${params.id}`,
          method: `GET`,
        }),
      },
    ),
  }),
});

export const { useGetAdminTransactionsQuery, useGetAdminTransactionInfoQuery } =
  adminTransactionsAPI;
