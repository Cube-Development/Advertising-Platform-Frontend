import { authApi } from "@shared/api";
import { ADV_PROJECTS, BALANCE, LEGALS } from "@shared/api/tags";
import { languagesNum } from "@shared/config/languages";
import { paymentTypes } from "@shared/config/payment";
import { IWalletHistory } from "@shared/types/history";

type PaymentOrderResponse = {
  success: boolean;
};

export type HistoryReq = {
  language: languagesNum;
  page: number;
  date_sort: "increase" | "decrease";
  elements_on_page?: number;
};

type HistoryResponse = {
  page: number;
  elements: number;
  transactions: IWalletHistory[];
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
      invalidatesTags: [BALANCE, LEGALS, ADV_PROJECTS],
    }),
    paymentDeposit: build.mutation<PaymentWithdrawResponse, PaymentDepositReq>({
      query: (params) => ({
        url: `/wallet/payment/deposit`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [BALANCE, LEGALS],
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
      invalidatesTags: [BALANCE, LEGALS],
    }),
    getBalance: build.query<PaymentWithdrawResponse, void>({
      query: () => `/wallet/balance`,
      providesTags: [BALANCE],
    }),
    getHistory: build.query<HistoryResponse, HistoryReq>({
      query: (params) => ({
        url: "wallet/transaction/user/history",
        method: "POST",
        params,
      }),
      providesTags: [BALANCE],
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
