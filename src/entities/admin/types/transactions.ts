import { adminTransactionTypesFilter, identificationType } from "../config";

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
  status: adminTransactionTypesFilter;
  subcard: IAdminTransactionInfo;
}

export interface IAdminTransactionInfo {
  id: string;
  status: adminTransactionTypesFilter;
  sender: IUser;
  receiver: IUser;
  transactions: ITransaction[];
  documents: IDocument[];
}

interface IUser {
  id: string;
  ident: identificationType;
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
