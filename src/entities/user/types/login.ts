import { languagesNum } from "@shared/config";
import { roles } from "../config";

export interface IRegiser {
  email: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: roles;
  language: languagesNum;
  code: number;
  promo: boolean;
}
