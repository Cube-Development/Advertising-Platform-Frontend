import { ADMIN_TRANSACTION_STATUS, TRANSACTION_ID_STATUS } from "../config";

export interface IAdminTransactions {
  page: number;
  elements: number;
  transactions: IAdminTransactionData[];
  isLast?: boolean;
}

export interface IAdminTransactionData {
  id: string;
  sender: string;
  receiver: string;
  transaction_date: string;
  transaction_type: string;
  way_type: string;
  amount: number;
  status: ADMIN_TRANSACTION_STATUS;
  subcard: IAdminTransactionInfo;
}

export interface IAdminTransactionInfo {
  id: string;
  status: ADMIN_TRANSACTION_STATUS;
  sender: IUser;
  receiver: IUser;
  transactions: ITransaction[];
  documents: IDocument[];
}

interface IUser {
  id: string;
  ident: TRANSACTION_ID_STATUS;
  user_id?: string;
}

interface ITransaction {
  id: string;
  journal_id: string;
  account_id: string;
  amount: number;
  created: string;
}

interface IDocument {
  filename: string;
}
