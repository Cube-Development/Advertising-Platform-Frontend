export enum platformStatus {
  active = 0,
  moderation = 1,
  reject = 2,
  deactivate = 3,
  ban = 4,
}

export enum platformType {
  telegram = "telegram",
  instagram = "instagram",
  youtube = "youtube",
}

export enum platformStatusFilter {
  active = "active",
  moderation = "moderation",
  reject = "reject",
  deactivate = "deactivate",
  ban = "ban",
}

export const bloggerPlatformStatus = [
  {
    name: "platforms_blogger.status_filter.active",
    type: platformStatusFilter.active,
  },
  {
    name: "platforms_blogger.status_filter.moderation",
    type: platformStatusFilter.moderation,
  },
  {
    name: "platforms_blogger.status_filter.reject",
    type: platformStatusFilter.reject,
  },
  {
    name: "platforms_blogger.status_filter.deactivate",
    type: platformStatusFilter.deactivate,
  },
  {
    name: "platforms_blogger.status_filter.ban",
    type: platformStatusFilter.ban,
  },
];
