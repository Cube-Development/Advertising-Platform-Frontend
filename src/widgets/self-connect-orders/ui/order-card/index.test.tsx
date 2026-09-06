import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { selfConnectOrderFixture } from "../../../../entities/admin/testing/fixtures/selfConnectOrder.fixture";
import { SelfConnectOrderCard } from "./index";

vi.mock("@shared/ui/shadcn-ui/ui/use-toast", () => ({
  toast: vi.fn(),
}));

vi.mock("/images/notFound/noUserAvatar.jpg", () => ({
  default: "avatar.jpg",
}));

describe("SelfConnectOrderCard", () => {
  test("показывает новые поля из READ-контракта", () => {
    render(<SelfConnectOrderCard order={selfConnectOrderFixture} />);

    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("track_orders.org_type.legal")).toBeTruthy();
    expect(screen.getByText("1/24")).toBeTruthy();
    expect(screen.getByText("24/48")).toBeTruthy();

    const postLink = screen.getByRole("link", {
      name: "track_orders.open_post",
    });
    expect(postLink.getAttribute("href")).toContain("t.me/test_channel/42");

    const botLink = screen.getByRole("link", {
      name: "track_orders.open_bot",
    });
    expect(botLink.getAttribute("href")).toContain("t.me/bot");

    expect(screen.getByText(/100.?000/)).toBeTruthy();
    expect(screen.getByText(/112.?000/)).toBeTruthy();
    expect(screen.getByText(/5.?000/)).toBeTruthy();
    expect(screen.getByText(/7.?000/)).toBeTruthy();
  });
});
