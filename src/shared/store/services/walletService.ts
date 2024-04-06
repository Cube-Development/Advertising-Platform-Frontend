import { authApi } from "@shared/api";

type PaymentOrderResponse = {
  success?: boolean;
  detail?: [
    {
      loc: ["string"];
      msg: "string";
      type: "string";
    },
  ];
};

type PaymentDepositResponse = {
  account_id?: string;
  balance?: number;
  detail?: [
    {
      loc: ["string"];
      msg: "string";
      type: "string";
    },
  ];
};

type PaymentDepositReq = {
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
        // body: BodyParams,
      }),
    }),
    paymentWithdrawal: build.mutation<
      PaymentDepositResponse,
      PaymentDepositReq
    >({
      query: (BodyParams) => ({
        url: `/wallet/payment/deposit`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getBalance: build.query<PaymentDepositResponse, any>({
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
