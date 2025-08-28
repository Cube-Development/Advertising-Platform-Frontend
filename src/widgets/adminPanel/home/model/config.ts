// config/adminHomeCards.ts
import { ENUM_PATHS } from "@shared/routing";
import {
  CircleDollarSign,
  MessageSquareText,
  OctagonAlert,
  Tv,
  Users,
} from "lucide-react";
import { IAdminHomeCard } from "./types";

export const ADMIN_CARDS_LIST: IAdminHomeCard[] = [
  {
    path: ENUM_PATHS.ADMIN_CHANNELS,
    title: "admin_panel.home.channels.title",
    text: "admin_panel.home.channels.text",
    icon: Tv,
  },
  {
    path: ENUM_PATHS.ADMIN_USERS,
    title: "admin_panel.home.users.title",
    text: "admin_panel.home.users.text",
    icon: Users,
  },
  {
    path: ENUM_PATHS.ADMIN_TRANSACTIONS,
    title: "admin_panel.home.transactions.title",
    text: "admin_panel.home.transactions.text",
    icon: CircleDollarSign,
  },
  {
    path: ENUM_PATHS.ADMIN_REVIEWS,
    title: "admin_panel.home.reviews.title",
    text: "admin_panel.home.reviews.text",
    icon: MessageSquareText,
  },
  {
    path: ENUM_PATHS.ADMIN_COMPLAINTS,
    title: "admin_panel.home.complaints.title",
    text: "admin_panel.home.complaints.text",
    icon: OctagonAlert,
  },
];
