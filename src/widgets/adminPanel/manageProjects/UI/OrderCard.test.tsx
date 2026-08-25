import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { manageProjectOrderFixture } from "../../../../entities/admin/testing/fixtures/manageProjectOrder.fixture";
import { OrderCard } from "./OrderCard";

vi.mock("@shared/hooks", () => ({
  useCopyLink: () => ({ copyLink: vi.fn() }),
}));

vi.mock("../model/constants", () => ({
  getProjectStatusLabel: () => "В работе",
}));

vi.mock("@shared/utils", () => ({
  formatMoney: (value: number) => String(value),
}));

describe("ManageProjects OrderCard", () => {
  test("рендерит order_id и период дат", () => {
    render(<OrderCard order={manageProjectOrderFixture} />);

    expect(screen.getByText("ord-manage-001")).toBeTruthy();
    expect(screen.getByText("10.03.2026 – 12.03.2026")).toBeTruthy();
    expect(screen.getByText("https://t.me/manage_channel")).toBeTruthy();
  });
});
