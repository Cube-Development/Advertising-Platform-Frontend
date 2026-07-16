import { OrderUpdateFormValues } from "./schema";

export type FieldConfig = {
  id: keyof OrderUpdateFormValues;
  label: string;
  type: string;
  placeholder?: string;
};

export const ORDER_UPDATE_FIELDS: FieldConfig[] = [
  {
    id: "order_ident",
    label: "ID ордера",
    type: "text",
    placeholder: "00000000-0000-0000-0000-000000000000",
  },
  {
    id: "amount",
    label: "Сумма",
    type: "number",
    placeholder: "50000",
  },
  {
    id: "executor",
    label: "Исполнитель",
    type: "email",
    placeholder: "executor@example.com",
  },
];
