export enum roles {
  advertiser = "advertiser",
  blogger = "blogger",
  manager = "manager",
  moderator = "moderator",
}

export const userRoles = [roles.blogger, roles.advertiser];
export const managementRoles = [roles.moderator, roles.manager];

export enum chatRoles {
  recipient = "recipient",
  sender = "sender",
}
export const rolesTypes = [
  {
    type: roles.advertiser,
    name: "roles.advertiser",
  },
  {
    type: roles.blogger,
    name: "roles.blogger",
  },
  {
    type: roles.manager,
    name: "roles.manager",
  },
  {
    type: roles.moderator,
    name: "roles.administrator",
  },
];
