import { OrderPublishFormValues } from "./schema";

export type FieldConfig = {
  id: keyof OrderPublishFormValues;
  label: string;
  type: string;
  placeholder?: string;
};

export const ORDER_PUBLISH_FIELDS: FieldConfig[] = [
  {
    id: "order_id",
    label: "ID ордера",
    type: "text",
    placeholder: "442996292",
  },
  {
    id: "url",
    label: "Ссылка",
    type: "url",
    placeholder: "https://t.me/channel/123",
  },
];
