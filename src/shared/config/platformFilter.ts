export enum platformStatus {
  active = 1,
  moderation = 0,
  moderationReject = 5,
  inactive = 2,
  banned = 3,
  deleted = 4,
}

export enum platformStatusFilter {
  active = "active",
  moderation = "moderation",
  moderationReject = "moderation_reject",
  inactive = "inactive",
  banned = "banned",
  deleted = "deleted",
}

export const bloggerPlatformStatus = [
  {
    name: "platforms_blogger.status_filter.active",
    type: platformStatusFilter.active,
    id: platformStatus.active,
  },
  {
    name: "platforms_blogger.status_filter.moderation",
    type: platformStatusFilter.moderation,
    id: platformStatus.moderation,
  },
  {
    name: "platforms_blogger.status_filter.moderation_reject",
    type: platformStatusFilter.moderationReject,
    id: platformStatus.moderationReject,
  },
  {
    name: "platforms_blogger.status_filter.inactive",
    type: platformStatusFilter.inactive,
    id: platformStatus.inactive,
  },
  {
    name: "platforms_blogger.status_filter.banned",
    type: platformStatusFilter.banned,
    id: platformStatus.banned,
  },
  {
    name: "platforms_blogger.status_filter.deleted",
    type: platformStatusFilter.deleted,
    id: platformStatus.deleted,
  },
];
