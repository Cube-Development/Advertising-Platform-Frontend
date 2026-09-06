import { ORGANIZATION_TYPE } from "../../config/organizationType";
import { ADMIN_CHANNEL_STATUS } from "../../../admin-panel/channels/config/channels.config";
import { ADMIN_USER_STATUS } from "../../../admin-panel/users/config/users.config";
import type {
  IAdminUserData,
  IAdminUserInfo,
} from "../../../admin-panel/users/types/users.types";

export const adminUserListItemFixture: IAdminUserData = {
  id: 1001,
  user_id: "user-uuid-1001",
  avatar: "",
  name: "user@blogix.uz",
  email: "user@blogix.uz",
  created: "15.01.2026",
  status: ADMIN_USER_STATUS.ACTIVE,
};

export const adminUserInfoFixture: IAdminUserInfo = {
  id: "user-uuid-1001",
  first_name: "Ivan",
  surname: "Ivanov",
  email: "user@blogix.uz",
  phone: "+998901234567",
  language: 3,
  created: "15.01.2026",
  organization: {
    tin: "305123456",
    pinfl: null,
    type: ORGANIZATION_TYPE.LEGAL,
    status: "active",
  },
  channels: [
    {
      id: "ch-uuid-user-1",
      url: "https://t.me/user_channel",
      name: "User Channel",
      status: ADMIN_CHANNEL_STATUS.ACTIVE,
      completed_count: 7,
    },
  ],
};
