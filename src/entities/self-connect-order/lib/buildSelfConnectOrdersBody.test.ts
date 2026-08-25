import { describe, expect, test } from "vitest";
import {
  EXECUTOR_TYPE,
  MANAGE_EXECUTOR_TYPE_DEFAULT,
} from "../../admin/config/executorType";
import {
  ENUM_OFFER_STATUS,
  ENUM_OFFER_STATUS_BACKEND,
} from "../../offer/config/offerStatus";
import { buildSelfConnectOrdersBody } from "./buildSelfConnectOrdersBody";

describe("buildSelfConnectOrdersBody", () => {
  test("мапит UI-статус в массив OrderStatus", () => {
    const body = buildSelfConnectOrdersBody({
      page: 1,
      status: ENUM_OFFER_STATUS.ACTIVE,
    });

    expect(body.status).toEqual([ENUM_OFFER_STATUS_BACKEND.in_progress]);
  });

  test("default executor_type = self_connect", () => {
    const body = buildSelfConnectOrdersBody({
      page: 1,
      status: ENUM_OFFER_STATUS.WAIT,
    });

    expect(body.executor_type).toBe(MANAGE_EXECUTOR_TYPE_DEFAULT);
    expect(body.executor_type).toBe(EXECUTOR_TYPE.SELF_CONNECT);
  });

  test("передаёт executor_type agency", () => {
    const body = buildSelfConnectOrdersBody({
      page: 2,
      status: ENUM_OFFER_STATUS.COMPLETED,
      executor_type: EXECUTOR_TYPE.AGENCY,
    });

    expect(body.executor_type).toBe(EXECUTOR_TYPE.AGENCY);
  });

  test("trim search и omit пустой", () => {
    expect(
      buildSelfConnectOrdersBody({
        page: 1,
        status: ENUM_OFFER_STATUS.ACTIVE,
        search: "  owner@blogix.uz  ",
      }).search,
    ).toBe("owner@blogix.uz");

    expect(
      buildSelfConnectOrdersBody({
        page: 1,
        status: ENUM_OFFER_STATUS.ACTIVE,
        search: "   ",
      }).search,
    ).toBeUndefined();

    expect(
      buildSelfConnectOrdersBody({
        page: 1,
        status: ENUM_OFFER_STATUS.ACTIVE,
        search: null,
      }).search,
    ).toBeUndefined();
  });

  test("короткий search (ident) не отбрасывается", () => {
    const body = buildSelfConnectOrdersBody({
      page: 1,
      status: ENUM_OFFER_STATUS.ACTIVE,
      search: "12",
    });

    expect(body.search).toBe("12");
  });
});
