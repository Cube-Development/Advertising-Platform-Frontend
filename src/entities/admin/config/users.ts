export enum ADMIN_USER_STATUS {
  BANNED = 0,
  ACTIVE = 1,
}

export const ADMIN_USER_STATUS_LIST = [
  {
    name: "admin_panel.users.card.status.active",
    id: ADMIN_USER_STATUS.ACTIVE,
  },
  {
    name: "admin_panel.users.card.status.banned",
    id: ADMIN_USER_STATUS.BANNED,
  },
];
