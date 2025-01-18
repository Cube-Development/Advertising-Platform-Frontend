export enum channelStatus {
  moderation = 0,
  active = 1,
  inactive = 2,
  banned = 3,
  moderationReject = 5,
  remoderation = 6,
}

export const adminChannelStatus = [
  {
    name: "admin_panel.channels.card.status.active",
    id: channelStatus.active,
  },
  {
    name: "admin_panel.channels.card.status.moderation",
    id: channelStatus.moderation,
  },
  {
    name: "admin_panel.channels.card.status.moderation_reject",
    id: channelStatus.moderationReject,
  },
  {
    name: "admin_panel.channels.card.status.inactive",
    id: channelStatus.inactive,
  },
  {
    name: "admin_panel.channels.card.status.banned",
    id: channelStatus.banned,
  },
  {
    name: "admin_panel.channels.card.status.remoderation",
    id: channelStatus.remoderation,
  },
];

export enum adminChannelForm {
  page = "page",
}
