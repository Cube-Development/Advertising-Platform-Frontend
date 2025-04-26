import { languagesNum } from "@shared/config";
import { ENUM_ROLES } from "../config";

export interface IRegister {
  email: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: ENUM_ROLES;
  language: languagesNum;
  code: number;
  promo: boolean;
}
