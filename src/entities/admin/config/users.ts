export enum userStatus {
  banned = 0,
  active = 1,
}

export const adminUserStatus = [
  {
    name: "admin_panel.users.card.status.active",
    id: userStatus.active,
  },
  {
    name: "admin_panel.users.card.status.banned",
    id: userStatus.banned,
  },
];
