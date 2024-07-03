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
