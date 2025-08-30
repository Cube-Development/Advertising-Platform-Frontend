import {
  ADMIN_ACCOUNTING_STATUS,
  ADMIN_ACCOUNTING_TYPE,
  ADMIN_ACCOUNTING_PERIOD_DAYS,
} from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { LucideIcon } from "lucide-react";

export interface IAccountingTab {
  label: string;
  icon: LucideIcon;
  wallet?: ENUM_WALLETS_TYPE;
  type?: ADMIN_ACCOUNTING_TYPE;
  status?: ADMIN_ACCOUNTING_STATUS;
  period?: ADMIN_ACCOUNTING_PERIOD_DAYS;
  date_sort?: dateSortingTypes;
}
