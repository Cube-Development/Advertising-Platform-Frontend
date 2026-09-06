import { describe, expect, test } from "vitest";
import {
  CHANNELS_EXECUTOR_TYPE_DEFAULT,
  EXECUTOR_TYPE,
} from "../../../admin/config/executorType";
import { ADMIN_CHANNEL_STATUS } from "../config/channels.config";
import { buildAdminChannelsParams } from "./buildAdminChannelsParams";

describe("buildAdminChannelsParams", () => {
  test("default executor_type = all", () => {
    const params = buildAdminChannelsParams({
      page: 1,
      status: ADMIN_CHANNEL_STATUS.ACTIVE,
      elements_on_page: 10,
    });

    expect(params.executor_type).toBe(CHANNELS_EXECUTOR_TYPE_DEFAULT);
    expect(params.executor_type).toBe(EXECUTOR_TYPE.ALL);
  });

  test("search_string любой непустой (без порога 3)", () => {
    expect(
      buildAdminChannelsParams({
        page: 1,
        status: ADMIN_CHANNEL_STATUS.ACTIVE,
        elements_on_page: 10,
        search_string: "ab",
      }).search_string,
    ).toBe("ab");
  });

  test("omit пустой search_string", () => {
    expect(
      buildAdminChannelsParams({
        page: 1,
        status: ADMIN_CHANNEL_STATUS.MODERATION,
        elements_on_page: 10,
        search_string: "  ",
      }).search_string,
    ).toBeUndefined();
  });

  test("trim search_string", () => {
    expect(
      buildAdminChannelsParams({
        page: 1,
        status: ADMIN_CHANNEL_STATUS.ACTIVE,
        elements_on_page: 10,
        search_string: "  @channel  ",
        executor_type: EXECUTOR_TYPE.AGENCY,
      }),
    ).toMatchObject({
      search_string: "@channel",
      executor_type: EXECUTOR_TYPE.AGENCY,
    });
  });
});
