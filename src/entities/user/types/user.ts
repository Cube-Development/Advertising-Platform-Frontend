import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { ENUM_ROLES } from "../config";
import { IPasswordData } from "./password";

export interface IUser {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: ENUM_ROLES;
  language: ENUM_LANGUAGES_NUM;
  location: string;
  name: string;
  lastname: string;
  phone: string;
  password: string;
  new_password: string;
  accept_password: string;
}

export interface IUserData {
  user_additional: IUserInfo;
}

export interface IUserInfo {
  first_name: string;
  surname: string;
  email?: string;
  phone: string;
  language: number;
  location: string;
}

export interface IEmailData {
  new_email: string;
  password: string;
}

export interface IEventsData {
  user_events: IEventsInfo;
}

export interface IEventsInfo {
  system_events?: boolean;
  project_events: boolean;
  promo_events: boolean;
}

export interface IProfileData extends IUserData, IPasswordData, IEventsData {
  id?: string;
  created: string;
  telegram?: string;
}

export enum ENUM_ORGANIZATION_TYPE {
  SELF_EMPLOYED = "SelfEmployed",
  INDIVIDUAL_ENTITY = "IndividualEntity",
  LEGAL_ENTITY = "LegalEntity",
}

export enum ENUM_ORGANIZATION_STATUS {
  NOT_APPROVED = 0,
  APPROVED = 1,
}

export interface IUserDataNew {
  email: string;
  phone: string;
  name: string;
  registrationDate: string;
  organization: {
    type: ENUM_ORGANIZATION_TYPE;
    inn?: string;
    pinfl?: string;
    status: ENUM_ORGANIZATION_STATUS;
  };
}
