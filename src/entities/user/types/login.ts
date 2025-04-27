import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { ENUM_ROLES } from "../config";

export interface IRegister {
  email: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: ENUM_ROLES;
  language: ENUM_LANGUAGES_NUM;
  code: number;
  promo: boolean;
}
