import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { adminUserInfoFixture } from "../../../../entities/admin/testing/fixtures/adminUser.fixture";
import { ADMIN_CHANNEL_STATUS_LIST } from "../../../../entities/admin-panel/channels/config/channels.config";
import { UserInfo } from "./index";

vi.mock("@shared/hooks", () => ({
  useClearCookiesOnPage: () => undefined,
  useCopyLink: () => ({ copyLink: vi.fn() }),
}));

vi.mock("@entities/admin-panel", () => ({
  ADMIN_CHANNEL_STATUS_LIST,
  useGetAdminUserInfoQuery: () => ({
    data: adminUserInfoFixture,
    isLoading: false,
    isFetching: false,
  }),
}));

describe("UserInfo", () => {
  test("показывает organization и карточки каналов", () => {
    render(
      <MemoryRouter initialEntries={["/admin/users/user-uuid-1001"]}>
        <Routes>
          <Route path="/admin/users/:id" element={<UserInfo />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("305123456")).toBeTruthy();
    expect(screen.getByText("track_orders.org_type.legal")).toBeTruthy();
    expect(screen.getByText("User Channel")).toBeTruthy();
    expect(screen.getByText("https://t.me/user_channel")).toBeTruthy();
    expect(screen.getByText(/7/)).toBeTruthy();
  });
});
