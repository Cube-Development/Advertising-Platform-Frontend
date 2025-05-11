import { dateSortingTypes } from "@entities/platform";
import { IWalletHistory, paymentTypes } from "@entities/wallet";
import {
  ADV_PROJECTS,
  BALANCE,
  LEGALS,
  TRANSACTION_HISTORY,
  authApi,
} from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";

type PaymentOrderResponse = {
  success: boolean;
};

export type HistoryReq = {
  language: ENUM_LANGUAGES_NUM;
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
                (response?.page - 1) * INTERSECTION_ELEMENTS.HISTORY ||
            response?.transactions?.length === 0,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, arg) => {
        const existing = currentCache.transactions ?? [];
        const incoming = newItems.transactions ?? [];

        // Если это первая страница — добавляем новые в начало
        if (arg.arg.page === 1) {
          const existingIds = new Set(existing.map((el) => el.id));

          // Только те, которых ещё не было
          const uniqueNew = incoming.filter((el) => !existingIds.has(el.id));

          const merged = [...uniqueNew, ...existing];

          // Удалим дубликаты на всякий случай
          const seen = new Set<string>();
          const deduped = merged.filter((el) => {
            if (seen.has(el.id)) return false;
            seen.add(el.id);
            return true;
          });

          return {
            ...newItems,
            isLast: currentCache?.isLast,
            transactions: deduped,
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
