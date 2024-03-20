export enum profileFilter {
  individual = "individual",
  entity = "entity",
  selfEmployed = "selfEmployed",
  selfemployedaccount = "selfemployedaccount",
}
export enum subprofileFilter {
  account = "account",
  card = "card",
}

export const profileTypes = [
  {
    name: "add_profile.types.selfemployedaccount",
    type: profileFilter.selfEmployed,
  },
  {
    name: "add_profile.types.entity",
    type: profileFilter.entity,
  },
  {
    name: "add_profile.types.individual",
    type: profileFilter.individual,
  },
];

export const subprofileTypes = [
  {
    name: "add_profile.subtypes.account",
    type: subprofileFilter.account,
  },
  {
    name: "add_profile.subtypes.card",
    type: subprofileFilter.card,
  },
];

export const walletTopUpTypes = [
  {
    name: "wallet.types.selfemployed",
    type: profileFilter.selfEmployed,
  },
  {
    name: "wallet.types.entity",
    type: profileFilter.entity,
  },
  {
    name: "wallet.types.individual",
    type: profileFilter.individual,
  },
];
