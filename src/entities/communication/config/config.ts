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

export enum chatTypesFilter {
  blogger = "blogger",
  manager = "manager",
  advertiser = "advertiser",
}

export const chatAdvertiserTypes = [
  {
    name: "chat.types.blogger",
    type: chatTypesFilter.blogger,
  },
  {
    name: "chat.types.manager",
    type: chatTypesFilter.manager,
  },
];

export const chatManagerTypes = [
  {
    name: "chat.types.blogger",
    type: chatTypesFilter.blogger,
  },
  {
    name: "chat.types.advertiser",
    type: chatTypesFilter.advertiser,
  },
];
