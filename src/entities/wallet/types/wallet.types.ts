import { PROFILE_STATUS, PROFILE_TYPE } from "../config";
import { ENUM_WALLETS_TYPE } from "./wallets.enum";

export interface ICreatePaymentRequest {
  project_id: string;
  wallet_type: ENUM_WALLETS_TYPE;
}

export interface ICreatePaymentResponse {
  success: boolean;
}

export interface ICreateDepositRequest {
  amount: number;
}

export interface ICreateDepositResponse {
  payment_invoice_id: string;
  payment_invoice_url: string;
}

export interface ICreateDeposit {
  doc_id: string;
}

export interface ICreateWithdrawRequest {
  amount: number;
  wallet_type: ENUM_WALLETS_TYPE;
}

export interface IWithdrawResponse {
  account_id: string;
  balance: number;
  refund_letter_url: string;
}
export interface IWalletResponse {
  account_id: string;
  balance: number;
  wallet: ENUM_WALLETS_TYPE;
}

export interface IGetBalance {
  items: IWalletResponse[];
}

export interface IWalletOperations {
  amount: number;
  wallet_type?: ENUM_WALLETS_TYPE;
  profileFilter?: {
    type: PROFILE_TYPE;
    id?: PROFILE_STATUS;
  };
}

export interface ICreateSpending {
  amount: number;
}
