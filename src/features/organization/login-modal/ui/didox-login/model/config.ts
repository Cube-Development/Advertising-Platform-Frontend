import { ENUM_DIGITAL_LOGIN_TYPE } from "@entities/organization";
import { Key, LockKeyhole } from "lucide-react";
import { IDidoxLoginTab } from "./types";

export const DIGITAL_LOGIN_TABS_LIST: IDidoxLoginTab[] = [
  {
    label: "organization.login.didox.type.certificate",
    type: ENUM_DIGITAL_LOGIN_TYPE.CERTIFICATE,
    icon: Key,
  },
  {
    label: "organization.login.didox.type.password",
    type: ENUM_DIGITAL_LOGIN_TYPE.PASSWORD,
    icon: LockKeyhole,
  },
];
