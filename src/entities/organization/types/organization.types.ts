import { ENUM_ORGANIZATION_STATUS } from "./organization.enum";

export interface IGetMyOrganizationResponse {
  id: string;
  TIN: string;
  PINFL: string;
  offer_id: string;
  status: ENUM_ORGANIZATION_STATUS;
  created: string;
}

export interface ICreateOrganizationRequest {
  TIN: string;
  PINFL: string;
}

export interface IOrganizationStatus {
  label: string;
  status: ENUM_ORGANIZATION_STATUS;
}
