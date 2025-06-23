import { PROFILE_STATUS, PROFILE_TYPE } from "@entities/wallet";

export const ADD_ORGANIZATION_FILTER_TABS_LIST = [
  {
    name: "add_organization.types.self_employed",
    type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
    id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
  },
  {
    name: "add_organization.types.legal",
    type: PROFILE_TYPE.ENTITIES,
    id: PROFILE_STATUS.ENTITIES,
  },
];
