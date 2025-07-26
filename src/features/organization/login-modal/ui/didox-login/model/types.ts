import { ENUM_DIGITAL_LOGIN_TYPE } from "@entities/organization";
import { LucideIcon } from "lucide-react";

export interface IDidoxLoginTab {
  label: string;
  type: ENUM_DIGITAL_LOGIN_TYPE;
  icon: LucideIcon;
}
