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
}
