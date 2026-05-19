import { MailingFormInput } from "./schema";

export type FieldConfig = {
  id: keyof MailingFormInput;
  label: string;
  type: string;
  placeholder?: string;
  step?: string;
};

export const MAILING_MAIN_FIELDS: FieldConfig[] = [
  {
    id: "subject",
    label: "Тема",
    type: "text",
    placeholder: "Тема рассылки",
  },
  {
    id: "role",
    label: "Роль",
    type: "text",
    placeholder: "blogger, advertiser или all",
  },
];

export const MAILING_TEXT_FIELDS: FieldConfig[] = [
  {
    id: "text",
    label: "Текст рассылки",
    type: "textarea",
    placeholder: "Введите текст...",
  },
  {
    id: "users",
    label: "Пользователи (через запятую)",
    type: "text",
    placeholder: "user1, user2",
  },
];
