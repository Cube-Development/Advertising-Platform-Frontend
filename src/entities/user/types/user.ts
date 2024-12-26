import { languagesNum } from "@shared/config";
import { roles } from "../config";

export interface IUser {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: roles;
  language: languagesNum;
  location: string;
  name: string;
  lastname: string;
  phone: string;
  password: string;
  new_password: string;
  accept_password: string;
}

export interface IUserData {
  first_name: string;
  surname: string;
  email: string;
  phone: string;
  language: number;
  location: string;
}

export interface IPasswordData {
  // password: string;
  new_password: string;
  accept_password: string;
}

export interface IEventsData {
  system_events: boolean;
  project_events: boolean;
  promo_events: boolean;
}

export interface IProfileData extends IUserData, IPasswordData, IEventsData {
  id?: string;
  created: string;
  telegram?: string;
}
