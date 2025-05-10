import { IPostChannel } from "@entities/project";

export function getFormUniquePosts(cards: IPostChannel[]) {
  return cards.map((card) => ({
    platform: card.platform,
    post_type: card.post_type,
    order_id: card.id,
  }));
}
