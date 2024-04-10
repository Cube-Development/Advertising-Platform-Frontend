import { authApi } from "@shared/api";
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
      query: (BodyParams) => ({
        url: `/wallet/payment/project`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    paymentOrder: build.mutation<PaymentOrderResponse, string>({
      query: (BodyParams) => ({
        url: `/wallet/payment/order`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    paymentDeposit: build.mutation<PaymentDepositResponse, PaymentDepositReq>({
      query: (BodyParams) => ({
        url: `/wallet/payment/deposit?legal_id=${BodyParams.legal_id}&amount=${BodyParams.amount}`,
        method: `POST`,
      }),
    }),
    paymentWithdrawal: build.mutation<
      PaymentWithdrawResponse,
      PaymentWithdrawReq
    >({
      query: (BodyParams) => ({
        url: `/wallet/payment/withdrawal?legal_id=${BodyParams.legal_id}&amount=${BodyParams.amount}`,
        method: `POST`,
      }),
    }),
    getBalance: build.query<PaymentDepositResponse, void>({
      query: () => `/wallet/balance`,
    }),
  }),
});

export const {
  useGetBalanceQuery,
  usePaymentDepositMutation,
  usePaymentOrderMutation,
  usePaymentProjectMutation,
  usePaymentWithdrawalMutation,
} = walletAPI;
