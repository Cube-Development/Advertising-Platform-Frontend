import {
  ICatalogChannel,
  IFormat,
  IRecommendCards,
  catalogAPI,
  getRecommendChannels,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { IReadChannelData } from "@entities/channel";
import { useAppDispatch } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useChannelCartFetch } from "./useChannelCartFetch";
import { useChannelCartAdd } from "./useChannelCartAdd";
import { useChannelCartRemove } from "./useChannelCartRemove";

interface UseChannelCartManagerProps {
  isAuth: boolean;
  role: ENUM_ROLES;
  guestId: string;
  projectId: string;
  language: number;
  channel: IReadChannelData;
  setChannel: (card: IReadChannelData) => void;
  selectedFormat: IFormat | null;
  recomendCards: IRecommendCards | undefined;
  formFields: getRecommendChannels;
}

export const useChannelCartManager = ({
  isAuth,
  role,
  guestId,
  projectId,
  language,
  channel,
  setChannel,
  selectedFormat,
  recomendCards,
  formFields,
}: UseChannelCartManagerProps) => {
  const dispatch = useAppDispatch();

  const { currentCart, isFetchingCart } = useChannelCartFetch(
    isAuth,
    role,
    guestId,
    projectId,
    language,
  );

  const { handleAddToCart, isAddingToCart } = useChannelCartAdd(
    isAuth,
    role,
    guestId,
    projectId,
    channel,
    setChannel,
  );

  const { handleRemoveFromCart, isRemovingFromCart } = useChannelCartRemove(
    isAuth,
    role,
    guestId,
    projectId,
    channel,
    setChannel,
  );

  const handleChangeCards = async (
    cartChannel: ICatalogChannel,
    currentCard: ICatalogChannel | undefined,
  ) => {
    if (!cartChannel?.selected_format || !currentCard) return;

    const addReq = {
      channel_id: cartChannel.id,
      format: cartChannel.selected_format.format,
      match: cartChannel.match,
      language: language || USER_LANGUAGES_LIST[0].id,
    };

    const removeReq = {
      channel_id: cartChannel.id,
      language: language || USER_LANGUAGES_LIST[0].id,
    };

    if (
      currentCard.selected_format?.format ===
      cartChannel.selected_format?.format
    ) {
      const newCard = { ...channel, selected_format: undefined };
      await handleRemoveFromCart(
        removeReq,
        currentCard,
        newCard as IReadChannelData,
      );
    } else {
      const newCard = { ...channel, selected_format: selectedFormat };
      await handleAddToCart(addReq, currentCard, newCard as IReadChannelData);
    }

    const newCards =
      recomendCards?.channels?.filter(
        (item: any) => item.id !== cartChannel.id,
      ) || [];

    dispatch(
      catalogAPI.util.updateQueryData(
        "getRecommedChannels",
        { ...formFields },
        (draft: any) => {
          draft.channels = newCards;
        },
      ),
    );
  };

  const isCartActionLoading = isAddingToCart || isRemovingFromCart;

  return {
    currentCart,
    handleChangeCards,
    isCartActionLoading,
    isFetchingCart,
  };
};
