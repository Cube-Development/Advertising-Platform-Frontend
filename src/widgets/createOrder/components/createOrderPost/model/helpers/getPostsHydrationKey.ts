import type { IManagerOrderPost } from "@entities/project";

export const getPostsHydrationKey = (posts: IManagerOrderPost[]): string =>
  posts
    .map((post) =>
      [
        post.id,
        post.match_type,
        post.platform,
        post.post_type,
        post.comment ?? "",
        post.orders?.map((order) => order.order_id).join(",") ?? "",
        post.files
          ?.map(
            (file) =>
              `${file.content_type}:${file.content}:${file.url ?? ""}:${file.name ?? ""}`,
          )
          .join(";") ?? "",
      ].join("|"),
    )
    .join("||");
