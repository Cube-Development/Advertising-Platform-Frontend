import { platformTypes } from "@entities/platform";
import { IPostChannel } from "@entities/project";

export const getPlatformIds = (cards: IPostChannel[]): number[] => {
  const cardsIds: number[] = [...new Set(cards?.map((card) => card?.platform))];
  const platformTypesIds: number[] = platformTypes.map(
    (platform) => platform?.id,
  );
  return platformTypesIds.filter((el) => cardsIds.includes(el));
};
