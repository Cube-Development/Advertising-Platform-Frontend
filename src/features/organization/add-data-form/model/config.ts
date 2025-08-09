import {
  ENUM_DIGITAL_LOGIN_TYPE,
  ENUM_DIGITAL_SIGNATURE_AUTH,
} from "@entities/organization";
import { IDigitalLoginTab } from "./types";
import { FileSignature, Lock, LogIn, UserPlus } from "lucide-react";

export const DIGITAL_LOGIN_TABS_LIST: IDigitalLoginTab[] = [
  {
    name: "organization.login.password",
    type: ENUM_DIGITAL_LOGIN_TYPE.PASSWORD,
    icon: Lock,
  },
  {
    name: "organization.login.certificate",
    type: ENUM_DIGITAL_LOGIN_TYPE.CERTIFICATE,
    icon: FileSignature,
  },
];

export const DIGITAL_AUTH_TABS_LIST: IDigitalLoginTab[] = [
  {
    name: "registration",
    type: ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION,
    icon: UserPlus,
  },
  {
    name: "login",
    type: ENUM_DIGITAL_SIGNATURE_AUTH.LOGIN,
    icon: LogIn,
  },
];
