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
}

export enum channelStatus {
  active = 1,
  moderation = 0,
  moderationReject = 5,
  inactive = 2,
  banned = 3,
}

export enum channelStatusFilter {
  active = "active",
  moderation = "moderation",
  moderationReject = "rejected",
  inactive = "inactive",
  banned = "banned",
}

export const bloggerChannelStatus = [
  {
    name: "platforms_blogger.status_filter.active",
    type: channelStatusFilter.active,
    id: channelStatus.active,
  },
  {
    name: "platforms_blogger.status_filter.moderation",
    type: channelStatusFilter.moderation,
    id: channelStatus.moderation,
  },
  {
    name: "platforms_blogger.status_filter.moderation_reject",
    type: channelStatusFilter.moderationReject,
    id: channelStatus.moderationReject,
  },
  {
    name: "platforms_blogger.status_filter.inactive",
    type: channelStatusFilter.inactive,
    id: channelStatus.inactive,
  },
  {
    name: "platforms_blogger.status_filter.banned",
    type: channelStatusFilter.banned,
    id: channelStatus.banned,
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
