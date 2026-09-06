import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { adminChannelListItemFixture } from "../../../../../../entities/admin/testing/fixtures/adminChannel.fixture";
import { CardTrigger } from "./card-trigger";

vi.mock("@shared/hooks", () => ({
  useCopyLink: () => ({ copyLink: vi.fn() }),
}));

vi.mock("@features/admin-panel", () => ({
  ChannelCardMenu: () => null,
}));

vi.mock("@entities/project/config/catalog", () => ({
  platformToIcon: {
    1: () => null,
  },
}));

vi.mock("@shared/ui", () => ({
  AccordionTrigger: ({
    children,
    ...props
  }: {
    children?: unknown;
    [key: string]: unknown;
  }) => (
    <button type="button" {...props}>
      {children as never}
    </button>
  ),
  AccountsLoader: () => null,
}));

vi.mock("@shared/ui/shadcn-ui", () => ({
  Badge: ({ children }: { children?: unknown }) => (
    <span>{children as never}</span>
  ),
  Card: ({ children }: { children?: unknown }) => (
    <div>{children as never}</div>
  ),
  CardHeader: ({ children }: { children?: unknown }) => (
    <div>{children as never}</div>
  ),
  CardContent: ({ children }: { children?: unknown }) => (
    <div>{children as never}</div>
  ),
}));

vi.mock("/images/notFound/noUserAvatar.jpg", () => ({
  default: "avatar.jpg",
}));

describe("Admin Channel CardTrigger", () => {
  test("показывает email и user_id владельца", () => {
    render(<CardTrigger card={adminChannelListItemFixture} />);

    expect(screen.getByText("owner@blogix.uz")).toBeTruthy();
    expect(screen.getByText("owner-user-uuid")).toBeTruthy();
    expect(screen.getByText("№42")).toBeTruthy();
  });
});
