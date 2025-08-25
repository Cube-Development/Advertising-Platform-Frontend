export enum ENUM_OFFER_STATUS_BACKEND {
  wait = 1,
  in_progress = 2,
  completed = 3,
  canceled = 4,
  rejected = 5,
  post_matched = 6,
  date_interval = 7,
  date_constant = 8,
  post_review = 9,
  moderation = 10,
  unknown1 = 11,
  unknown2 = 12,
  toSign = 13,
}

export enum ENUM_OFFER_STATUS {
  ACTIVE = "active",
  WAIT = "wait",
  COMPLETED = "completed",
  CANCELED = "canceled",
  MODERATION = "moderation",
  UNFULFILLED = "unfulfilled",
}

export const BLOGGER_OFFER_TABS_LIST = [
  {
    name: "offers_blogger.status_filter.active",
    type: ENUM_OFFER_STATUS.ACTIVE,
  },
  {
    name: "offers_blogger.status_filter.waiting",
    type: ENUM_OFFER_STATUS.WAIT,
  },
  {
    name: "offers_blogger.status_filter.complete",
    type: ENUM_OFFER_STATUS.COMPLETED,
  },
  {
    name: "offers_blogger.status_filter.reject",
    type: ENUM_OFFER_STATUS.CANCELED,
  },
  {
    name: "offers_blogger.status_filter.moderation",
    type: ENUM_OFFER_STATUS.MODERATION,
  },
  {
    name: "offers_blogger.status_filter.uncomplete",
    type: ENUM_OFFER_STATUS.UNFULFILLED,
  },
];

export const OFFER_CHAT_LIST = [
  ENUM_OFFER_STATUS.ACTIVE,
  ENUM_OFFER_STATUS.WAIT,
];
