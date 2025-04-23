export enum ADMIN_CHANNEL_STATUS {
  MODERATION = 0,
  ACTIVE = 1,
  INACTIVE = 2,
  BANNED = 3,
  DELETED = 4,
  MODERATION_REJECT = 5,
  REMODERATION = 6,
  INVALID_URL = 7,
}

export const ADMIN_CHANNEL_STATUS_LIST = [
  {
    name: "admin_panel.channels.card.status.active",
    id: ADMIN_CHANNEL_STATUS.ACTIVE,
  },
  {
    name: "admin_panel.channels.card.status.moderation",
    id: ADMIN_CHANNEL_STATUS.MODERATION,
  },
  {
    name: "admin_panel.channels.card.status.moderation_reject",
    id: ADMIN_CHANNEL_STATUS.MODERATION_REJECT,
  },
  {
    name: "admin_panel.channels.card.status.inactive",
    id: ADMIN_CHANNEL_STATUS.INACTIVE,
  },
  {
    name: "admin_panel.channels.card.status.banned",
    id: ADMIN_CHANNEL_STATUS.BANNED,
  },
  {
    name: "admin_panel.channels.card.status.remoderation",
    id: ADMIN_CHANNEL_STATUS.REMODERATION,
  },
];

export const ADMIN_CHANNEL_FILTER_TABS_LIST = [
  {
    name: "admin_panel.channels.card.status.active",
    type: ADMIN_CHANNEL_STATUS.ACTIVE,
  },
  {
    name: "admin_panel.channels.card.status.inactive",
    type: ADMIN_CHANNEL_STATUS.INACTIVE,
  },
  {
    name: "admin_panel.channels.card.status.moderation",
    type: ADMIN_CHANNEL_STATUS.MODERATION,
  },
  {
    name: "admin_panel.channels.card.status.moderation_reject",
    type: ADMIN_CHANNEL_STATUS.MODERATION_REJECT,
  },
  {
    name: "admin_panel.channels.card.status.banned",
    type: ADMIN_CHANNEL_STATUS.BANNED,
  },
];

export enum ADMIN_CHANNEL_FORM {
  PAGE = "page",
  STATUS = "status",
}
