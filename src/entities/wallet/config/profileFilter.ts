export enum PROFILE_TYPE {
  INDIVIDUALS = "individuals",
  ENTITIES = "entities",
  SELF_EMPLOYED_TRANSIT = "selfEmployedTransits",
  SELF_EMPLOYED_ACCOUNT = "selfEmployedAccounts",
}

export enum PROFILE_STATUS {
  INDIVIDUALS = 2,
  ENTITIES = 1,
  SELF_EMPLOYED_TRANSIT = 4,
  SELF_EMPLOYED_ACCOUNT = 3,
}

export enum SUBPROFILE_TYPE {
  ACCOUNT = "account",
  CARD = "card",
}

export const PROFILE_FILTER_TABS_LIST = [
  {
    name: "add_profile.types.selfemployedaccount",
    type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
    id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
  },
  {
    name: "add_profile.types.entity",
    type: PROFILE_TYPE.ENTITIES,
    id: PROFILE_STATUS.ENTITIES,
  },
  {
    name: "add_profile.types.individual",
    type: PROFILE_TYPE.INDIVIDUALS,
    id: PROFILE_STATUS.INDIVIDUALS,
  },
];

export const SUBPROFILE_FILTER_TABS_LIST = [
  {
    name: "add_profile.subtypes.account",
    type: SUBPROFILE_TYPE.ACCOUNT,
    id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
  },
  {
    name: "add_profile.subtypes.card",
    type: SUBPROFILE_TYPE.CARD,
    id: PROFILE_STATUS.SELF_EMPLOYED_TRANSIT,
  },
];

export const WALLET_TOP_UP_FILTER_TABS_LIST = [
  {
    name: "wallet.types.selfemployed",
    type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
    id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
  },
  {
    name: "wallet.types.entity",
    type: PROFILE_TYPE.ENTITIES,
    id: PROFILE_STATUS.ENTITIES,
  },
  {
    name: "wallet.types.individual",
    type: PROFILE_TYPE.INDIVIDUALS,
    id: PROFILE_STATUS.INDIVIDUALS,
  },
];
