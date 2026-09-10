import { OrderTransferFormInput } from "./schema";

export type FieldConfig = {
  id: keyof OrderTransferFormInput;
  label: string;
  type: string;
  placeholder?: string;
  step?: string;
};

export const ORDER_MAIN_FIELDS: FieldConfig[] = [
  {
    id: "order_ident",
    label: "ID ордера",
    type: "text",
    placeholder: "380339986 или uuid",
  },
  { id: "order_date", label: "Дата переноса", type: "date" },
];

export const ORDER_TIME_FIELDS: FieldConfig[] = [
  { id: "time_from", label: "Время от", type: "time", step: "1" },
  { id: "time_to", label: "Время до", type: "time", step: "1" },
];
