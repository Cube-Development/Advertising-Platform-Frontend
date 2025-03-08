import { dateSortingTypes } from "@entities/platform";
import { IWalletHistory, paymentTypes } from "@entities/wallet";
import {
  ADV_PROJECTS,
  BALANCE,
  LEGALS,
  TRANSACTION_HISTORY,
  authApi,
} from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";

type PaymentOrderResponse = {
  success: boolean;
};

export type HistoryReq = {
  language: languagesNum;
  page: number;
  date_sort: dateSortingTypes;
  elements_on_page?: number;
};

type HistoryResponse = {
  page: number;
  elements: number;
  transactions: IWalletHistory[];
  isLast?: boolean;
};

type PaymentDepositReq = {
  amount: number;
  legal_id: string;
  way_type: paymentTypes;
};

type PaymentWithdrawResponse = {
  account_id: string;
  balance: number;
};

type PaymentWithdrawReq = {
  amount: number;
  legal_id: string;
};

export const walletAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    paymentProject: build.mutation<PaymentOrderResponse, string>({
      query: (params) => ({
        url: `/wallet/payment/project?project_id=${params}`,
        method: `POST`,
      }),
      invalidatesTags: [BALANCE, LEGALS, ADV_PROJECTS, TRANSACTION_HISTORY],
    }),
    paymentDeposit: build.mutation<PaymentWithdrawResponse, PaymentDepositReq>({
      query: (params) => ({
        url: `/wallet/payment/deposit`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [BALANCE, LEGALS, TRANSACTION_HISTORY],
    }),
    paymentWithdrawal: build.mutation<
      PaymentWithdrawResponse,
      PaymentWithdrawReq
    >({
      query: (params) => ({
        url: `/wallet/payment/withdrawal`,
        method: `POST`,
        params,
      }),
      invalidatesTags: [BALANCE, LEGALS, TRANSACTION_HISTORY],
    }),
    getBalance: build.query<PaymentWithdrawResponse, void>({
      query: () => ({
        url: `/wallet/balance`,
        method: "GET",
      }),
      providesTags: [BALANCE],
    }),
    getHistory: build.query<HistoryResponse, HistoryReq>({
      query: (params) => ({
        url: "wallet/transaction/user/history",
        method: "POST",
        params,
      }),
      transformResponse: (response: HistoryResponse) => {
        return {
          ...response,
          isLast:
            response?.elements ===
            response?.transactions?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.history,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }

        return {
          ...newItems,
          transactions: [
            ...currentCache.transactions,
            ...newItems.transactions,
          ],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [TRANSACTION_HISTORY],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  usePaymentDepositMutation,
  usePaymentProjectMutation,
  usePaymentWithdrawalMutation,
  useGetHistoryQuery,
} = walletAPI;
