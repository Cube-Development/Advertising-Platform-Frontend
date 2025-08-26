import { ENUM_PATHS } from "@shared/routing";
import { IMenuItem } from "@shared/types";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  Files,
} from "lucide-react";

export const WALLET_USER_MENU: IMenuItem[] = [
  {
    item: {
      title: "wallet_menu.top_up",
      path: ENUM_PATHS.WALLET_TOP_UP,
      icon: ArrowDownToLine,
    },
  },
  {
    item: {
      title: "wallet_menu.withdraw",
      path: ENUM_PATHS.WALLET_WITHDRAW,
      icon: ArrowUpFromLine,
    },
  },
  {
    item: {
      title: "wallet_menu.history",
      path: ENUM_PATHS.WALLET_HISTORY,
      icon: ArrowLeftRight,
    },
  },
  {
    item: {
      title: "wallet_menu.invoice",
      path: ENUM_PATHS.DOCUMENTS,
      icon: Files,
    },
  },
];
