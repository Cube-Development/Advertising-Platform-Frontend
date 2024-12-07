import { transactionStatus } from "../config";

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
  status: transactionStatus;
  subcard: IAdminTransactionInfo;
}

export interface IAdminTransactionInfo {
  id: string;
  status: transactionStatus;
  sender: IUser;
  receiver: IUser;
  transactions: ITransaction[];
  documents: IDocument[];
}

interface IUser {
  id: string;
  identification: string;
  userId?: string;
}

interface ITransaction {
  id: string;
  transactionId: string;
  accountId: string;
  amount: number;
  datetime: string;
}

interface IDocument {
  filename: string;
}
