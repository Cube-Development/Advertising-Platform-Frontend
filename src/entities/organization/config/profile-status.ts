import { ENUM_ORGANIZATION_STATUS, IOrganizationStatus } from "../types";

export const ORGANIZATION_STATUS_LIST: IOrganizationStatus[] = [
  {
    label: "profile.user_block.organization_data.status_types.approved",
    status: ENUM_ORGANIZATION_STATUS.ACTIVE,
  },
  {
    label: "profile.user_block.organization_data.status_types.not_approved",
    status: ENUM_ORGANIZATION_STATUS.PENDING,
  },
];
