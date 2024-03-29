export enum profileTypesName {
  individuals = "individuals",
  entities = "entities",
  selfEmployedTransits = "selfEmployedTransits",
  selfEmployedAccounts = "selfEmployedAccounts",
}

export enum profileTypesNum {
  individuals = 2,
  entities = 1,
  selfEmployedTransits = 4,
  selfEmployedAccounts = 3,
}

export enum subprofileFilter {
  account = "account",
  card = "card",
}

export const profileTypes = [
  {
    name: "add_profile.types.selfemployedaccount",
    type: profileTypesName.selfEmployedAccounts,
    id: profileTypesNum.selfEmployedAccounts,
  },
  {
    name: "add_profile.types.entity",
    type: profileTypesName.entities,
    id: profileTypesNum.entities,
  },
  {
    name: "add_profile.types.individual",
    type: profileTypesName.individuals,
    id: profileTypesNum.individuals,
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
    type: profileTypesName.selfEmployedAccounts,
    id: profileTypesNum.selfEmployedAccounts,
  },
  {
    name: "wallet.types.entity",
    type: profileTypesName.entities,
    id: profileTypesNum.entities,
  },
  {
    name: "wallet.types.individual",
    type: profileTypesName.individuals,
    id: profileTypesNum.individuals,
  },
];
