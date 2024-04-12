export enum offerStatus {
  active = 0,
  wait = 1,
  complite = 2,
  cancel = 3,
  moderation = 4,
  uncomplite = 5,
  check = 6,
}

export enum offerStatusFilter {
  active = "active",
  waiting = "waiting",
  complite = "complite",
  reject = "reject",
  moderation = "moderation",
  uncomplite = "uncomplite",
}

export const bloggerOfferStatus = [
  {
    name: "offers_blogger.status_filter.active",
    type: offerStatusFilter.active,
  },
  {
    name: "offers_blogger.status_filter.waiting",
    type: offerStatusFilter.waiting,
  },
  {
    name: "offers_blogger.status_filter.complite",
    type: offerStatusFilter.complite,
  },
  {
    name: "offers_blogger.status_filter.reject",
    type: offerStatusFilter.reject,
  },
  {
    name: "offers_blogger.status_filter.moderation",
    type: offerStatusFilter.moderation,
  },
  {
    name: "offers_blogger.status_filter.uncomplite",
    type: offerStatusFilter.uncomplite,
  },
];

export const offerStatusChat = [offerStatus.active, offerStatus.wait];
