import { platformTypesNum } from "../../../platform/config/config";
import { ADMIN_CHANNEL_STATUS } from "../../../admin-panel/channels/config/channels.config";
import type {
  IAdminChannelData,
  IAdminChannelInfo,
} from "../../../admin-panel/channels/types/channels.types";

export const adminChannelListItemFixture: IAdminChannelData = {
  channel: {
    id: "ch-uuid-001",
    avatar: "",
    name: "Admin Test Channel",
    platform: platformTypesNum.telegram,
  },
  owner_id: 42,
  created: "01.02.2026",
  status: ADMIN_CHANNEL_STATUS.ACTIVE,
  user_id: "owner-user-uuid",
  email: "owner@blogix.uz",
};

export const adminChannelInfoFixture: IAdminChannelInfo = {
  description: "Channel description",
  category: { id: 1, name: "News" },
  url: "https://t.me/admin_test",
  male: 60,
  female: 40,
  text_limit: 4096,
  language: [{ id: 3, name: "RU" }],
  age: [{ id: 1, name: "18-24" }],
  region: [{ id: 1, name: "UZ" }],
  format: [],
  grade: 4.5,
  complete: 10,
  complaints: 1,
  on_hold: 0,
  cancel: 2,
  not_complete: 0,
  in_progress: 3,
  tags: [],
  user_id: "owner-user-uuid",
  email: "owner@blogix.uz",
};
