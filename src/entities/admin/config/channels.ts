export enum adminChannelTypesFilter {
  moderation = 0,
  active = 1,
  inactive = 2,
  banned = 3,
  deleted = 4,
  moderationReject = 5,
  remoderation = 6,
  invalidUrl = 7,
}

export const adminChannelStatus = [
  {
    name: "admin_panel.channels.card.status.active",
    id: adminChannelTypesFilter.active,
  },
  {
    name: "admin_panel.channels.card.status.moderation",
    id: adminChannelTypesFilter.moderation,
  },
  {
    name: "admin_panel.channels.card.status.moderation_reject",
    id: adminChannelTypesFilter.moderationReject,
  },
  {
    name: "admin_panel.channels.card.status.inactive",
    id: adminChannelTypesFilter.inactive,
  },
  {
    name: "admin_panel.channels.card.status.banned",
    id: adminChannelTypesFilter.banned,
  },
  {
    name: "admin_panel.channels.card.status.remoderation",
    id: adminChannelTypesFilter.remoderation,
  },
];

export const adminChannelTypes = [
  {
    name: "admin_panel.channels.card.status.active",
    type: adminChannelTypesFilter.active,
  },
  {
    name: "admin_panel.channels.card.status.moderation",
    type: adminChannelTypesFilter.moderation,
  },
  {
    name: "admin_panel.channels.card.status.moderation_reject",
    type: adminChannelTypesFilter.moderationReject,
  },
  {
    name: "admin_panel.channels.card.status.inactive",
    type: adminChannelTypesFilter.inactive,
  },
  {
    name: "admin_panel.channels.card.status.banned",
    type: adminChannelTypesFilter.banned,
  },
  {
    name: "admin_panel.channels.card.status.remoderation",
    type: adminChannelTypesFilter.remoderation,
  },
];

export enum adminChannelForm {
  page = "page",
  status = "status",
}
