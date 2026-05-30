import { Building2, User, LucideIcon } from "lucide-react";

export enum RegistrationType {
  Legal = "legal",
  SelfEmployed = "self_employed",
}

export interface IRegistrationTypeOption {
  type: RegistrationType;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const REGISTRATION_TYPE_OPTIONS: IRegistrationTypeOption[] = [
  {
    type: RegistrationType.Legal,
    label: "organization.login.registration_type.options.legal",
    description:
      "organization.login.registration_type.options.legal_description",
    icon: Building2,
  },
  {
    type: RegistrationType.SelfEmployed,
    label: "organization.login.registration_type.options.self_employed",
    description:
      "organization.login.registration_type.options.self_employed_description",
    icon: User,
  },
];

export const REGISTRATION_TYPE_HINTS: Record<RegistrationType, string[]> = {
  [RegistrationType.Legal]: [
    "organization.login.registration_type.hints.legal.0",
    "organization.login.registration_type.hints.legal.1",
    "organization.login.registration_type.hints.legal.2",
  ],
  [RegistrationType.SelfEmployed]: [
    "organization.login.registration_type.hints.self_employed.0",
    "organization.login.registration_type.hints.self_employed.1",
    "organization.login.registration_type.hints.self_employed.2",
  ],
};
