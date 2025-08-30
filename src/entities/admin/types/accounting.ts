import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { ADMIN_ACCOUNTING_STATUS, ADMIN_ACCOUNTING_TYPE } from "../config";

export interface IAdminAccounting {
  page: number;
  elements: number;
  transactions: IAdminAccountingData[];
  isLast?: boolean;
  status: ADMIN_ACCOUNTING_STATUS;
}

export interface IAdminAccountingData {
  id: string;
  TIN: string;
  PINFL: string;
  amount: number;
  type: ADMIN_ACCOUNTING_TYPE;
  wallet_type: ENUM_WALLETS_TYPE;
  status: number;
  doc_id: string;
  document_file: string;
  created_date: string;
  created_time: string;
}
