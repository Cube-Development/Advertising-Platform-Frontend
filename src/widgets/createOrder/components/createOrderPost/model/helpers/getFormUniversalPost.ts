import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { IPostChannel } from "@entities/project";

export function getFormUniversalPost(cards: IPostChannel[]) {
  return cards.reduce(
    (acc: { platform: platformTypesNum; post_type: PostTypesNum }[], card) => {
      const exists = acc.find(
        (post) =>
          post?.platform === card?.platform &&
          post?.post_type === card?.post_type,
      );
      if (!exists) {
        acc.push({
          platform: card?.platform,
          post_type: card?.post_type,
        });
      }
      return acc;
    },
    [],
  );
}
