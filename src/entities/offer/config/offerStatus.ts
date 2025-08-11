export enum offerStatus {
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

export enum offerStatusFilter {
  active = "active",
  wait = "wait",
  completed = "completed",
  canceled = "canceled",
  moderation = "moderation",
  unfulfilled = "unfulfilled",
}

export const bloggerOfferStatus = [
  {
    name: "offers_blogger.status_filter.active",
    type: offerStatusFilter.active,
  },
  {
    name: "offers_blogger.status_filter.waiting",
    type: offerStatusFilter.wait,
  },
  {
    name: "offers_blogger.status_filter.complete",
    type: offerStatusFilter.completed,
  },
  {
    name: "offers_blogger.status_filter.reject",
    type: offerStatusFilter.canceled,
  },
  {
    name: "offers_blogger.status_filter.moderation",
    type: offerStatusFilter.moderation,
  },
  {
    name: "offers_blogger.status_filter.uncomplete",
    type: offerStatusFilter.unfulfilled,
  },
];

export const offerStatusChat = [
  offerStatusFilter.active,
  offerStatusFilter.wait,
];
