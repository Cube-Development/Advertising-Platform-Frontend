import { ProjectCompleteFormValues } from "./schema";

export type FieldConfig = {
  id: keyof ProjectCompleteFormValues;
  label: string;
  type: string;
  placeholder?: string;
};

export const PROJECT_COMPLETE_FIELDS: FieldConfig[] = [
  {
    id: "project_id",
    label: "ID проекта",
    type: "text",
    placeholder: "00000000-0000-0000-0000-000000000000",
  },
];
