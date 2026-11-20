import { ContentType, GetPostRes } from "@entities/project";
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { platformTypesNum, PostTypesNum } from "../../../../config";
import { DisplaySite } from "./index";

// Баррель entity тянет API и store по кругу — нужен только enum типов контента
vi.mock("@entities/project", () => ({
  ContentType: { text: 1, photo: 2, video: 3, file: 4, button: 5, gif: 6 },
}));

const sitePost = (overrides: Partial<GetPostRes> = {}): GetPostRes => ({
  id: "00000000-0000-4000-8930-000000000001",
  platform: platformTypesNum.site,
  post_type: PostTypesNum.site,
  comment: "Статья до 8 000 символов, фото 900x600",
  files: [
    {
      content_type: ContentType.file,
      content: "https://example.com/tz.docx",
      name: "tz.docx",
    },
    {
      content_type: ContentType.photo,
      content: "https://example.com/cover.png",
      name: "cover.png",
    },
    // Текст и кнопки к ТЗ сайта не относятся — не показываются
    { content_type: ContentType.text, content: "<p>text</p>" },
  ],
  ...overrides,
});

beforeAll(() => {
  // jsdom без ResizeObserver: макет телефона подписывается на размер картинки
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

describe("DisplaySite", () => {
  test("without a post shows the brief hint (order creation)", () => {
    render(<DisplaySite />);

    expect(screen.getByText("create_order.create.site")).toBeTruthy();
    expect(screen.queryByText("download_all_files")).toBeNull();
  });

  test("with a post shows the brief comment and every attachment", () => {
    render(<DisplaySite post={sitePost()} />);

    expect(
      screen.getByText("Статья до 8 000 символов, фото 900x600"),
    ).toBeTruthy();
    expect(screen.getByText("tz.docx")).toBeTruthy();
    expect(screen.getByText("cover.png")).toBeTruthy();
    expect(screen.queryByText("<p>text</p>")).toBeNull();
    expect(screen.queryByText("create_order.create.site")).toBeNull();
  });

  test("an empty post falls back to the hint", () => {
    render(<DisplaySite post={sitePost({ comment: "", files: [] })} />);

    expect(screen.getByText("create_order.create.site")).toBeTruthy();
  });
});
