import {
  ADMIN_ACCOUNTING_PERIOD_DAYS,
  ADMIN_ACCOUNTING_STATUS,
  ADMIN_ACCOUNTING_TYPE,
} from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
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
  InfinityIcon,
  Repeat,
  Sun,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { IAccountingTab } from "./types";

export const ACCOUNTING_STATUS_LIST: IAccountingTab[] = [
  {
    label: "admin_panel.accounting.tabs.category.type.top_up",
    icon: ArrowDownToLine,
    wallet: ENUM_WALLETS_TYPE.DEPOSIT,
    type: ADMIN_ACCOUNTING_TYPE.TOP_UP,
  },
  {
    label: "admin_panel.accounting.tabs.category.type.withdraw",
    icon: ArrowUpFromLine,
    wallet: ENUM_WALLETS_TYPE.PROFIT,
    type: ADMIN_ACCOUNTING_TYPE.WITHDRAW,
  },
  {
    label: "admin_panel.accounting.tabs.category.type.refund",
    icon: Repeat,
    wallet: ENUM_WALLETS_TYPE.DEPOSIT,
    type: ADMIN_ACCOUNTING_TYPE.WITHDRAW,
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
  },
  {
    label: "admin_panel.accounting.tabs.signature.type.rejected",
    icon: CircleX,
    status: ADMIN_ACCOUNTING_STATUS.REJECTED,
  },
  {
    label: "admin_panel.accounting.tabs.signature.type.completed",
    icon: CircleCheckBig,
    status: ADMIN_ACCOUNTING_STATUS.COMPLETED,
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
