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

export enum complaintPriority {
  low = 0,
  medium = 1,
  high = 2,
}

export const adminComplaintPriorityStatus = [
  {
    name: "admin_panel.complaints.card.priority_status.low",
    id: complaintPriority.low,
  },
  {
    name: "admin_panel.complaints.card.priority_status.medium",
    id: complaintPriority.medium,
  },
  {
    name: "admin_panel.complaints.card.priority_status.high",
    id: complaintPriority.high,
  },
];

export enum complaintStatus {
  wait = 0,
  active = 1,
  complite = 2,
}

export const adminComplaintStatus = [
  {
    name: "admin_panel.complaintInfo.card.status.wait",
    id: complaintStatus.wait,
  },
  {
    name: "admin_panel.complaintInfo.card.status.active",
    id: complaintStatus.active,
  },
  {
    name: "admin_panel.complaintInfo.card.status.complite",
    id: complaintStatus.complite,
  },
];
