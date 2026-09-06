export enum ADMIN_USER_STATUS {
  BLOCKED = -1,
  ACTIVE = 1,
}

export const ADMIN_USER_STATUS_LIST = [
  {
    name: "admin_panel.users.card.status.active",
    id: ADMIN_USER_STATUS.ACTIVE,
  },
  {
    name: "admin_panel.users.card.status.banned",
    id: ADMIN_USER_STATUS.BLOCKED,
  },
];

export const ADMIN_USER_FILTER_ALL = "all" as const;

export type AdminUserStatusFilter =
  | ADMIN_USER_STATUS
  | typeof ADMIN_USER_FILTER_ALL;

export const ADMIN_USER_FILTER_TABS: {
  name: string;
  type: AdminUserStatusFilter;
}[] = [
  {
    name: "admin_panel.users.filter.all",
    type: ADMIN_USER_FILTER_ALL,
  },
  {
    name: "admin_panel.users.card.status.active",
    type: ADMIN_USER_STATUS.ACTIVE,
  },
  {
    name: "admin_panel.users.card.status.banned",
    type: ADMIN_USER_STATUS.BLOCKED,
  },
];
