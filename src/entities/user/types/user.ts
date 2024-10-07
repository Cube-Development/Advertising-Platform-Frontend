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
