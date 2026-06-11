import { DeleteOrganizationFormInput } from "./schema";

export type FieldConfig = {
  id: keyof DeleteOrganizationFormInput;
  label: string;
  type: string;
  placeholder?: string;
};

export const DELETE_ORGANIZATION_FIELDS: FieldConfig[] = [
  {
    id: "email",
    label: "Email организации",
    type: "email",
    placeholder: "org@example.com",
  },
];
