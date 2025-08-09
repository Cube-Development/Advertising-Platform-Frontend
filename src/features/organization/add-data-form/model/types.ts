import {
  ENUM_DIGITAL_LOGIN_TYPE,
  ENUM_DIGITAL_SIGNATURE_AUTH,
} from "@entities/organization";
import { LucideIcon } from "lucide-react";

export interface IDigitalLoginTab {
  name: string;
  type: ENUM_DIGITAL_LOGIN_TYPE | ENUM_DIGITAL_SIGNATURE_AUTH;
  icon: LucideIcon;
}
