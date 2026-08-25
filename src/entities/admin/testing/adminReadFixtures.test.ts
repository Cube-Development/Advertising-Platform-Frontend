import { describe, expect, test } from "vitest";
import {
  ORGANIZATION_TYPE,
  ORGANIZATION_TYPE_LABEL,
} from "../config/organizationType";
import { ADMIN_USER_STATUS } from "../../admin-panel/users/config/users.config";
import {
  adminChannelInfoFixture,
  adminChannelListItemFixture,
  adminUserInfoFixture,
  manageProjectOrderFixture,
  selfConnectOrderFixture,
} from "./fixtures";

describe("admin READ fixtures shape", () => {
  test("self-connect order: nullable email, org_type, format, post_url, 4 prices", () => {
    const order = selfConnectOrderFixture;

    expect(order.executor.email).toBeNull();
    expect(order.owner.email).toBeNull();
    expect(order.owner.org_type).toBe(ORGANIZATION_TYPE.LEGAL);
    expect(order.format).toEqual({ small: "1/24", big: "24/48" });
    expect(order.post_url).toBeTruthy();
    expect(order.post_deeplink).toBeTruthy();
    expect(order.price).toMatchObject({
      without_vat: expect.any(Number),
      with_vat: expect.any(Number),
      blogger_commission: expect.any(Number),
      catalog_commission: expect.any(Number),
    });
  });

  test("manage project order: order_id + date period", () => {
    const order = manageProjectOrderFixture;

    expect(order.order_id).toBe("ord-manage-001");
    expect(order.order_date).toEqual({
      date_from: "10.03.2026",
      date_to: "12.03.2026",
    });
  });

  test("admin channel list: user_id + email; info: grade", () => {
    expect(adminChannelListItemFixture.user_id).toBe("owner-user-uuid");
    expect(adminChannelListItemFixture.email).toBe("owner@blogix.uz");
    expect(adminChannelInfoFixture.grade).toBe(4.5);
  });

  test("admin user info: organization + channels completed_count", () => {
    expect(adminUserInfoFixture.organization?.tin).toBe("305123456");
    expect(adminUserInfoFixture.organization?.type).toBe(
      ORGANIZATION_TYPE.LEGAL,
    );
    expect(adminUserInfoFixture.channels[0].completed_count).toBeTypeOf(
      "number",
    );
  });

  test("ADMIN_USER_STATUS.BLOCKED === -1", () => {
    expect(ADMIN_USER_STATUS.BLOCKED).toBe(-1);
    expect(ADMIN_USER_STATUS.ACTIVE).toBe(1);
  });

  test("ORGANIZATION_TYPE_LABEL keys", () => {
    expect(ORGANIZATION_TYPE_LABEL[ORGANIZATION_TYPE.LEGAL]).toBe(
      "track_orders.org_type.legal",
    );
    expect(ORGANIZATION_TYPE_LABEL[ORGANIZATION_TYPE.INDIVIDUAL]).toBe(
      "track_orders.org_type.individual",
    );
  });
});
