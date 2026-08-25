import { describe, expect, test } from "vitest";
import { ADMIN_USER_STATUS } from "../config/users.config";
import { buildAdminUsersParams } from "./buildAdminUsersParams";

describe("buildAdminUsersParams", () => {
  test("базовые params без search/status/last", () => {
    expect(
      buildAdminUsersParams({
        elements_on_page: 10,
      }),
    ).toEqual({ elements_on_page: 10 });
  });

  test("передаёт search trim и status", () => {
    expect(
      buildAdminUsersParams({
        elements_on_page: 10,
        search: "  user@mail.com ",
        status: ADMIN_USER_STATUS.ACTIVE,
      }),
    ).toEqual({
      elements_on_page: 10,
      search: "user@mail.com",
      status: ADMIN_USER_STATUS.ACTIVE,
    });
  });

  test("omit status когда не передан (все)", () => {
    const params = buildAdminUsersParams({
      elements_on_page: 10,
      search: null,
    });

    expect(params).not.toHaveProperty("status");
    expect(params).not.toHaveProperty("search");
  });

  test("передаёт last курсор", () => {
    expect(
      buildAdminUsersParams({
        elements_on_page: 10,
        last: "2026-01-15T10:00:00",
      }).last,
    ).toBe("2026-01-15T10:00:00");
  });
});
