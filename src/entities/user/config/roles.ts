export enum ENUM_ROLES {
  ADVERTISER = "advertiser",
  BLOGGER = "blogger",
  MANAGER = "manager",
  MODERATOR = "moderator",
}

export const USER_ROLES = [ENUM_ROLES.BLOGGER, ENUM_ROLES.ADVERTISER];
export const MANAGEMENT_ROLES = [ENUM_ROLES.MODERATOR, ENUM_ROLES.MANAGER];

export enum ENUM_CHAT_ROLES {
  recipient = "recipient",
  sender = "sender",
}
export const ROLES_TYPES_LIST = [
  {
    type: ENUM_ROLES.ADVERTISER,
    name: "roles.advertiser",
  },
  {
    type: ENUM_ROLES.BLOGGER,
    name: "roles.blogger",
  },
  {
    type: ENUM_ROLES.MANAGER,
    name: "roles.manager",
  },
  {
    type: ENUM_ROLES.MODERATOR,
    name: "roles.administrator",
  },
];
