import { ENUM_ROLES } from "@entities/user";

export enum registrationSteps {
  email = "email",
  code = "code",
  registration = "registration",
}

export const REGISTRATION_ROLE_SWITCHER = [
  { type: ENUM_ROLES.ADVERTISER, name: "roles.advertiser" },
  { type: ENUM_ROLES.BLOGGER, name: "roles.blogger" },
];
