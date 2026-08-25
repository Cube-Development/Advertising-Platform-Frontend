import type { IAdminManageProjectOrder } from "../../api/adminService";

export const manageProjectOrderFixture: IAdminManageProjectOrder = {
  order_id: "ord-manage-001",
  url: "https://t.me/manage_channel",
  order_date: { date_from: "10.03.2026", date_to: "12.03.2026" },
  order_time: { time_from: "09:00", time_to: "21:00" },
  order_completed_count: 3,
  price: {
    without_vat: 50000,
    with_vat: 56000,
    blogger_commission: 2000,
    catalog_commission: 3000,
  },
  status: 6,
};
