import { IPostChannel, PostFormats } from "@entities/project";

export const getPostFormats = (cards: IPostChannel[]) => {
  return cards?.reduce((acc, order) => {
    const platformIndex = acc.findIndex(
      (item) => item.platform === order.platform,
    );
    if (platformIndex > -1) {
      const existingPlatform = acc[platformIndex];
      if (!existingPlatform.post_types.includes(order.post_type)) {
        existingPlatform.post_types.push(order.post_type);
      }
    } else {
      acc.push({
        platform: order.platform,
        post_types: [order.post_type],
      });
    }
    return acc;
  }, [] as PostFormats[]);
};
