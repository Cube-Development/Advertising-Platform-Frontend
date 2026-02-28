import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Calendar,
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarDays,
  CircleCheckBig,
  CircleX,
  Clock,
  Repeat,
  Sun,
  InfinityIcon,
} from "lucide-react";
import { IAccountingTab } from "../types";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { useTranslation } from "react-i18next";
import { dateSortingTypes } from "@entities/platform";

export enum ADMIN_ACCOUNTING_STATUS {
  COMPLETED = 1,
  PENDING = 2,
  REJECTED = 3,
}

export enum ADMIN_ACCOUNTING_TYPE {
  TOP_UP = 1,
  WITHDRAW = 2,
  REFUND = 6,
}

export enum ADMIN_ACCOUNTING_PERIOD_DAYS {
  ALL = 0,
  TODAY = 1,
  WEEK = 7,
  MONTH = 30,
}

export const ACCOUNTING_STATUS_LIST: IAccountingTab[] = [
  {
    label: "admin_panel.accounting.tabs.category.type.top_up",
    icon: ArrowDownToLine,
    wallet: ENUM_WALLETS_TYPE.DEPOSIT,
    type: ADMIN_ACCOUNTING_TYPE.TOP_UP,
    wallet_label: "admin_panel.accounting.card.wallet.deposit",
    type_label: "admin_panel.accounting.card.type.top_up",
  },
  {
    label: "admin_panel.accounting.tabs.category.type.withdraw",
    icon: ArrowUpFromLine,
    wallet: ENUM_WALLETS_TYPE.PROFIT,
    type: ADMIN_ACCOUNTING_TYPE.WITHDRAW,
    wallet_label: "admin_panel.accounting.card.wallet.profit",
    type_label: "admin_panel.accounting.card.type.withdraw",
  },
  {
    label: "admin_panel.accounting.tabs.category.type.refund",
    icon: Repeat,
    wallet: ENUM_WALLETS_TYPE.DEPOSIT,
    type: ADMIN_ACCOUNTING_TYPE.REFUND,
    wallet_label: "admin_panel.accounting.card.wallet.deposit",
    type_label: "admin_panel.accounting.card.type.withdraw",
  },
];

export const ACCOUNTING_OPTIONS = ({ LIST }: { LIST: IAccountingTab[] }) => {
  const { t } = useTranslation();
  return LIST.map((item, index) => {
    return {
      name: t(item.label),
      id: index,
      img: item.icon,
    };
  });
};

export const ACCOUNTING_PERIOD_LIST: IAccountingTab[] = [
  {
    label: "admin_panel.accounting.tabs.period.type.all",
    icon: InfinityIcon,
    period: ADMIN_ACCOUNTING_PERIOD_DAYS.ALL,
  },
  {
    label: "admin_panel.accounting.tabs.period.type.today",
    icon: Sun,
    period: ADMIN_ACCOUNTING_PERIOD_DAYS.TODAY,
  },
  {
    label: "admin_panel.accounting.tabs.period.type.week",
    icon: Calendar,
    period: ADMIN_ACCOUNTING_PERIOD_DAYS.WEEK,
  },
  {
    label: "admin_panel.accounting.tabs.period.type.month",
    icon: CalendarDays,
    period: ADMIN_ACCOUNTING_PERIOD_DAYS.MONTH,
  },
];

export const ACCOUNTING_SIGNATURE_LIST: IAccountingTab[] = [
  {
    label: "admin_panel.accounting.tabs.signature.type.pending",
    icon: Clock,
    status: ADMIN_ACCOUNTING_STATUS.PENDING,
    color: "text-yellow-700 bg-yellow-100",
  },
  {
    label: "admin_panel.accounting.tabs.signature.type.rejected",
    icon: CircleX,
    status: ADMIN_ACCOUNTING_STATUS.REJECTED,
    color: "text-red-700 bg-red-100",
  },
  {
    label: "admin_panel.accounting.tabs.signature.type.completed",
    icon: CircleCheckBig,
    status: ADMIN_ACCOUNTING_STATUS.COMPLETED,
    color: "text-green-700 bg-green-100",
  },
];

export const ACCOUNTING_DATE_SORTING_LIST: IAccountingTab[] = [
  {
    label: "admin_panel.accounting.tabs.sorting.type.decrease",
    icon: CalendarArrowDown,
    date_sort: dateSortingTypes?.decrease,
  },
  {
    label: "admin_panel.accounting.tabs.sorting.type.increase",
    icon: CalendarArrowUp,
    date_sort: dateSortingTypes?.increase,
  },
];

export const SIGN_STATUS_LIST = Array.from(
  new Set(ACCOUNTING_SIGNATURE_LIST.flatMap((item) => item.status)),
);
