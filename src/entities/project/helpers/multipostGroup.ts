import type { ICreatePost } from "../types/createPost";

export type MultipostSharedFields = Pick<
  ICreatePost,
  "text" | "buttons" | "comment" | "media" | "files"
>;

export function getMultipostGroupKey(post: ICreatePost): string {
  return String(post.post_group_id ?? post.order_id ?? "");
}

export function pickSharedContent(post: ICreatePost): MultipostSharedFields {
  return {
    text: post.text,
    buttons: post.buttons,
    comment: post.comment,
    media: post.media,
    files: post.files,
  };
}

export function countMultipostGroup(
  multiposts: ICreatePost[],
  post: ICreatePost,
): number {
  const key = getMultipostGroupKey(post);
  if (!key) return 0;
  return multiposts.filter((p) => getMultipostGroupKey(p) === key).length;
}

export function isMultipostEntryFilled(post: ICreatePost): boolean {
  return (
    post.comment !== undefined ||
    post.media !== undefined ||
    post.files !== undefined ||
    post.buttons !== undefined ||
    post.text !== undefined ||
    post.content !== undefined
  );
}

/** После локального изменения лидера — размазать контент на всех в той же группе */
export function syncMultipostGroupFields(
  multiposts: ICreatePost[],
  leaderOrderId: string,
): ICreatePost[] {
  const leader = multiposts.find((p) => p.order_id === leaderOrderId);
  if (!leader?.order_id) return multiposts;
  const groupKey = getMultipostGroupKey(leader);
  if (!groupKey) return multiposts;
  const shared = pickSharedContent(leader);
  return multiposts.map((p) =>
    getMultipostGroupKey(p) === groupKey ? { ...p, ...shared } : p,
  );
}

export function applyMultipostUpdate(
  multiposts: ICreatePost[],
  leaderOrderId: string,
  mutate: (leader: ICreatePost) => ICreatePost,
): ICreatePost[] {
  const leader = multiposts.find((p) => p.order_id === leaderOrderId);
  if (!leader?.order_id) return multiposts;
  const updatedLeader = mutate(leader);
  const others = multiposts.filter((p) => p.order_id !== leaderOrderId);
  return syncMultipostGroupFields([...others, updatedLeader], leaderOrderId);
}

/** Подтянуть канал target в группу выбранного канала (контент — от выбранного). */
export function mergeOrderIntoSelection(
  multiposts: ICreatePost[],
  selectedOrderId: string,
  targetOrderId: string,
): ICreatePost[] {
  if (selectedOrderId === targetOrderId) return multiposts;

  let next = multiposts.map((p) => ({ ...p }));
  const target = next.find((p) => p.order_id === targetOrderId);
  const selected = next.find((p) => p.order_id === selectedOrderId);
  if (!target || !selected) return multiposts;

  const targetKey = getMultipostGroupKey(target);
  const targetSiblings = next.filter(
    (p) => getMultipostGroupKey(p) === targetKey,
  );

  if (targetSiblings.length > 1) {
    next = next.map((p) => {
      if (p.order_id === targetOrderId) return p;
      if (getMultipostGroupKey(p) === targetKey) {
        return {
          ...p,
          post_group_id: p.order_id!,
          ...pickSharedContent(target),
        };
      }
      return p;
    });
  }

  const selectedAfter = next.find((p) => p.order_id === selectedOrderId)!;
  const targetAfter = next.find((p) => p.order_id === targetOrderId)!;
  const shared = pickSharedContent(selectedAfter);
  const selectedKey = getMultipostGroupKey(selectedAfter);
  const selectedSiblings = next.filter(
    (p) => getMultipostGroupKey(p) === selectedKey,
  );
  const newGroupId =
    selectedSiblings.length >= 2
      ? (selectedAfter.post_group_id ?? selectedAfter.order_id!)
      : crypto.randomUUID();

  return next.map((p) => {
    if (p.order_id === targetAfter.order_id) {
      return { ...p, post_group_id: newGroupId, ...shared };
    }
    if (getMultipostGroupKey(p) === selectedKey) {
      return { ...p, post_group_id: newGroupId };
    }
    return p;
  });
}

/** Отвязать канал: своя группа, копия текущего контента группы */
export function detachOrderFromGroup(
  multiposts: ICreatePost[],
  orderId: string,
): ICreatePost[] {
  const post = multiposts.find((p) => p.order_id === orderId);
  if (!post) return multiposts;
  if (countMultipostGroup(multiposts, post) <= 1) return multiposts;
  const shared = pickSharedContent(post);
  return multiposts.map((p) =>
    p.order_id === orderId ? { ...p, post_group_id: orderId, ...shared } : p,
  );
}
