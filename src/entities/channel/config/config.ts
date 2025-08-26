export enum addChannelQueries {
  platforms = "platforms",
  main = "main",
  offers = "offers",
}

// Количество опций, после которого появляется Scroll
export const enum PLATFORM_PARAMETERS {
  scrollAddLen = 5,
  defaultSexMale = 50,
  defaultTextLimit = 4096,
}

export enum channelData {
  search = "search_string",
  sort = "sort",
  filter = "filter",
}

export enum channelParameterData {
  platform = "platform",
  link = "link",
  category = "category",
  age = "age",
  language = "language",
  region = "region",
  format = "format",
  business = "business",
  page = "page",
  description = "description",
  prompt = "prompt",
  male = "male",
  female = "female",
}

export enum ENUM_CHANNEL_STATUS_BACKEND {
  moderation = 0,
  active = 1,
  inactive = 2,
  banned = 3,
  deleted = 4,
  moderationReject = 5,
  remoderation = 6,
  invalidUrl = 7,
}

export enum ENUM_CHANNEL_STATUS {
  ACTIVE = "active",
  MODERATION = "moderation",
  REJECTED = "rejected",
  INACTIVE = "inactive",
  BANNED = "banned",
}

export const BLOGGER_CHANNEL_TABS_LIST = [
  {
    name: "platforms_blogger.status_filter.active",
    type: ENUM_CHANNEL_STATUS.ACTIVE,
    id: ENUM_CHANNEL_STATUS_BACKEND.active,
  },
  {
    name: "platforms_blogger.status_filter.moderation",
    type: ENUM_CHANNEL_STATUS.MODERATION,
    id: ENUM_CHANNEL_STATUS_BACKEND.moderation,
  },
  {
    name: "platforms_blogger.status_filter.moderation_reject",
    type: ENUM_CHANNEL_STATUS.REJECTED,
    id: ENUM_CHANNEL_STATUS_BACKEND.moderationReject,
  },
  {
    name: "platforms_blogger.status_filter.inactive",
    type: ENUM_CHANNEL_STATUS.INACTIVE,
    id: ENUM_CHANNEL_STATUS_BACKEND.inactive,
  },
  {
    name: "platforms_blogger.status_filter.banned",
    type: ENUM_CHANNEL_STATUS.BANNED,
    id: ENUM_CHANNEL_STATUS_BACKEND.banned,
  },
];

export enum ratingData {
  perfect = 5,
  good = 4,
  normal = 3,
  bad = 2,
  terrible = 1,
}

export const ratingStatus = [
  {
    id: ratingData.perfect,
    name: "channel.reviews.rate.perfect",
  },
  {
    id: ratingData.good,
    name: "channel.reviews.rate.good",
  },
  {
    id: ratingData.normal,
    name: "channel.reviews.rate.normal",
  },
  {
    id: ratingData.bad,
    name: "channel.reviews.rate.bad",
  },
  {
    id: ratingData.terrible,
    name: "channel.reviews.rate.terrible",
  },
];
