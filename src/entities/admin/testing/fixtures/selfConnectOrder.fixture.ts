import { ORGANIZATION_TYPE } from "../../config/organizationType";
import { ENUM_OFFER_STATUS_BACKEND } from "../../../offer/config/offerStatus";
import type { ISelfConnectOrder } from "../../../self-connect-order/types/selfConnectOrder";

export const selfConnectOrderFixture: ISelfConnectOrder = {
  order_id: "4f50d8ea-d0f0-41aa-a246-08cb98e040c4",
  project_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  executor: {
    id: "exec-uuid",
    email: null,
    phone: "+998901112233",
    tin: null,
    pinfl: null,
  },
  customer: {
    id: "cust-uuid",
    email: "customer@blogix.uz",
    phone: null,
  },
  owner: {
    id: "owner-uuid",
    email: null,
    phone: "+998909998877",
    tin: "123456789",
    pinfl: null,
    org_type: ORGANIZATION_TYPE.LEGAL,
  },
  order_ident: 12345,
  url: "https://t.me/test_channel",
  name: "Test Channel",
  avatar: null,
  order_date: { date_from: "01.03.2026", date_to: "05.03.2026" },
  order_time: { time_from: "10:00", time_to: "18:00" },
  price: {
    without_vat: 100000,
    with_vat: 112000,
    blogger_commission: 5000,
    catalog_commission: 7000,
  },
  api_status: ENUM_OFFER_STATUS_BACKEND.in_progress,
  status: "В работе",
  post_deeplink: "https://t.me/bot?start=post1",
  post_url: "https://t.me/test_channel/42",
  format: { small: "1/24", big: "24/48" },
};
