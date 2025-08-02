import {
  ICreateDeposit,
  ICreateDepositRequest,
  ICreateDepositResponse,
  ICreatePaymentRequest,
  ICreatePaymentResponse,
  ICreateWithdrawRequest,
  IGetBalance,
  IHistoryRequest,
  IHistoryResponse,
  IWalletResponse,
} from "@entities/wallet";
import { BALANCE, TRANSACTION_HISTORY, authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";

export const walletAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getBalance: build.query<IGetBalance, void>({
      query: () => ({
        url: `/wallet/balance`,
        method: "GET",
      }),
      providesTags: [BALANCE],
    }),
    getHistory: build.query<
      IHistoryResponse,
      IHistoryRequest & { __isWebsocket?: boolean }
    >({
      query: ({ __isWebsocket, ...params }) => ({
        url: "wallet/transaction/user/history",
        method: "POST",
        params,
      }),
      transformResponse: (response: IHistoryResponse) => {
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
        const newIds = new Set(newItems.transactions.map((p) => p?.id));
        const filteredOld = currentCache?.transactions?.filter(
          (p) => !newIds.has(p?.id),
        );

        if (arg.arg.__isWebsocket) {
          return {
            ...currentCache,
            transactions: [...newItems.transactions, ...filteredOld],
          };
        } else if (arg.arg.page === 1 && !arg.arg.__isWebsocket) {
          return {
            ...newItems,
          };
        }
        return {
          ...newItems,
          transactions: [...filteredOld, ...newItems.transactions],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [TRANSACTION_HISTORY],
    }),
    createPaymentProject: build.mutation<
      ICreatePaymentResponse,
      ICreatePaymentRequest
    >({
      query: (body) => ({
        url: `/wallet/payment/project`,
        method: "POST",
        body: body,
      }),
    }),
    createDepositRequest: build.mutation<
      ICreateDepositResponse,
      ICreateDepositRequest
    >({
      query: (params) => ({
        url: `/wallet/payment/deposit/request`,
        method: "POST",
        params: params,
      }),
    }),
    createDeposit: build.mutation<IWalletResponse, ICreateDeposit>({
      query: (params) => ({
        url: `/wallet/payment/deposit`,
        method: "POST",
        params: params,
      }),
      invalidatesTags: [BALANCE],
    }),
    createWithdraw: build.mutation<IWalletResponse, ICreateWithdrawRequest>({
      query: (params) => ({
        url: `/wallet/payment/withdrawal`,
        method: "POST",
        params: params,
      }),
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useGetHistoryQuery,
  useCreatePaymentProjectMutation,
  useCreateDepositRequestMutation,
  useCreateDepositMutation,
  useCreateWithdrawMutation,
} = walletAPI;
