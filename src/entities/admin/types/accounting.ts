import { ADMIN_ACCOUNTING_PERIOD_DAYS } from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { LucideIcon } from "lucide-react";
import { ADMIN_ACCOUNTING_STATUS, ADMIN_ACCOUNTING_TYPE } from "../config";

export interface IAdminAccounting {
  page: number;
  elements: number;
  items: IAdminAccountingData[];
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
  status: ADMIN_ACCOUNTING_STATUS;
  doc_id: string;
  user_id: string;
  document_file: string;
  created_date: string;
  created_time: string;
}

export interface IAccountingTab extends IAdminAccountingDopData {
  label: string;
  icon: LucideIcon;
  wallet?: ENUM_WALLETS_TYPE;
  type?: ADMIN_ACCOUNTING_TYPE;
  status?: ADMIN_ACCOUNTING_STATUS;
  period?: ADMIN_ACCOUNTING_PERIOD_DAYS;
  date_sort?: dateSortingTypes;
}

export interface IAdminAccountingDopData {
  color?: string;
  wallet_label?: string;
  type_label?: string;
}

export interface IAdminAccountingDepositAccept {
  user_id: string;
  doc_id: string;
}
