import { ChannelOwnerSwapFormInput } from "./schema";

export type FieldConfig = {
  id: keyof ChannelOwnerSwapFormInput;
  label: string;
  type: string;
  placeholder?: string;
};

export const CHANNEL_OWNER_SWAP_FIELDS: FieldConfig[] = [
  {
    id: "channel_id",
    label: "ID канала",
    type: "text",
    placeholder: "00000000-0000-0000-0000-000000000000",
  },
  {
    id: "owner_email",
    label: "Email текущего владельца",
    type: "email",
    placeholder: "owner@example.com",
  },
  {
    id: "new_owner_email",
    label: "Email нового владельца",
    type: "email",
    placeholder: "newowner@example.com",
  },
];
