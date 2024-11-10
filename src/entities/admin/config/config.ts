export enum channelStatus {
  moderation = 0,
  active = 1,
  inactive = 2,
  banned = 3,
  moderationReject = 5,
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
];

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

export enum transactionStatus {
  reject = 0,
  complite = 1,
  pending = 2,
}

export const adminTransactionStatus = [
  {
    name: "admin_panel.transactions.card.status.complite",
    id: transactionStatus.complite,
  },
  {
    name: "admin_panel.transactions.card.status.reject",
    id: transactionStatus.reject,
  },
  {
    name: "admin_panel.transactions.card.status.pending",
    id: transactionStatus.pending,
  },
];

export enum complaintStatus {
  low = 0,
  medium = 1,
  high = 2,
}

export const adminComplaintStatus = [
  {
    name: "admin_panel.complaints.card.status.low",
    id: complaintStatus.low,
  },
  {
    name: "admin_panel.complaints.card.status.medium",
    id: complaintStatus.medium,
  },
  {
    name: "admin_panel.complaints.card.status.high",
    id: complaintStatus.high,
  },
];
