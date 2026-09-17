import type { IManagerOrderPost } from "@entities/project";
import { describe, expect, it } from "vitest";
import { getPostsHydrationKey } from "./getPostsHydrationKey";

const makePost = (
  id: string,
  text: string,
  orderId: string,
): IManagerOrderPost => ({
  id,
  platform: 1,
  files: [
    {
      content_type: 1,
      content: text,
    },
  ],
  orders: [{ order_id: orderId, channel_name: "ch" }],
  post_type: 4,
  match_type: 1,
});

describe("getPostsHydrationKey", () => {
  it("меняет ключ при замене post при том же количестве элементов", () => {
    const first = [makePost("post-1", "https://t.me/blogix_posts/1", "order-1")];
    const replaced = [
      makePost("post-1", "https://t.me/blogix_posts/2", "order-1"),
    ];

    expect(first).toHaveLength(replaced.length);
    expect(getPostsHydrationKey(first)).not.toBe(getPostsHydrationKey(replaced));
  });

  it("сохраняет ключ если содержимое не изменилось", () => {
    const posts = [makePost("post-1", "https://t.me/blogix_posts/1", "order-1")];
    expect(getPostsHydrationKey(posts)).toBe(getPostsHydrationKey([...posts]));
  });
});
