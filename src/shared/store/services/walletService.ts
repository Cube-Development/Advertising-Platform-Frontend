import { authApi } from "@shared/api";
import { BALANCE } from "@shared/api/tags";
import { paymentTypes } from "@shared/config/payment";

type PaymentOrderResponse = {
  success: boolean;
};

type PaymentDepositResponse = {
  account_id: string;
  balance: number;
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
      invalidatesTags: [BALANCE],
    }),
    paymentDeposit: build.mutation<PaymentDepositResponse, PaymentDepositReq>({
      query: (params) => ({
        url: `/wallet/payment/deposit`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [BALANCE],
    }),
    paymentWithdrawal: build.mutation<
      PaymentWithdrawResponse,
      PaymentWithdrawReq
    >({
      query: (params) => ({
        url: `/wallet/payment/withdrawal`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [BALANCE],
    }),
    getBalance: build.query<PaymentDepositResponse, void>({
      query: () => `/wallet/balance`,
      providesTags: [BALANCE],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  usePaymentDepositMutation,
  usePaymentProjectMutation,
  usePaymentWithdrawalMutation,
} = walletAPI;
