export enum RecipientType {
  sender = "sender",
  receiver = "receiver",
}

export enum MessageStatus {
  read = 1,
  unread = 0,
}

export const DAY_OF_WEEK = {
  Ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вск"],
};

export enum chatFilter {
  blogger = "blogger",
  manager = "manager",
  advertiser = "advertiser",
}

export const chatAdvertiserTypes = [
  {
    name: "chat.types.blogger",
    type: chatFilter.blogger,
  },
  {
    name: "chat.types.manager",
    type: chatFilter.manager,
  },
];

export const chatManagerTypes = [
  {
    name: "chat.types.blogger",
    type: chatFilter.blogger,
  },
  {
    name: "chat.types.advertiser",
    type: chatFilter.advertiser,
  },
];
