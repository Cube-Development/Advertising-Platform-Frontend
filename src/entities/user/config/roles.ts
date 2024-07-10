export enum roles {
  advertiser = "advertiser",
  blogger = "blogger",
  manager = "manager",
  administrator = "administrator",
}

export const userRoles = [roles.blogger, roles.advertiser];
export const managmentRoles = [roles.administrator, roles.manager];

export enum chatRoles {
  recipient = "recipient",
  sender = "sender",
}
