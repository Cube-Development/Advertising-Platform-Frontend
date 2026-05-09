import {
  getRecommendChannels,
  ICatalogChannel,
  IFormat,
  useGetRecommedChannelsQuery,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useForm } from "react-hook-form";
import { useChannelCartManager } from "./useChannelCartManager";
import { useChannelData } from "./useChannelData";
import { useChannelParams } from "./useChannelParams";

export const useChannelInfo = () => {
  const { userId, guestId, projectId, channel_id } = useChannelParams();
  const screen = useWindowWidth();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const language = useFindLanguage();

  const { watch } = useForm<getRecommendChannels>({
    defaultValues: {
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      channels: [channel_id],
    },
  });

  const formFields = watch();

  const {
    card,
    isLoading,
    channel,
    setChannel,
    selectedFormat,
    setSelectedFormat,
  } = useChannelData({
    channel_id,
    language: language?.id,
    userId,
    guestId,
    projectId: projectId || null,
    role,
  });

  const { data: recomendCards, isFetching: isRecommendCardsLoading } =
    useGetRecommedChannelsQuery(
      { ...formFields },
      { skip: role === ENUM_ROLES.BLOGGER },
    );

  const {
    currentCart,
    handleChangeCards,
    isCartActionLoading,
    isFetchingCart,
  } = useChannelCartManager({
    isAuth,
    role,
    guestId,
    projectId: projectId,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    channel,
    setChannel,
    selectedFormat,
    recomendCards,
    formFields,
  });

  const handleChangeCartCards = () => {
    const currentCard = channel;
    const cartChannel = { ...channel, selected_format: selectedFormat };
    handleChangeCards(
      cartChannel as unknown as ICatalogChannel,
      currentCard as unknown as ICatalogChannel,
    );
  };

  const handleChangeRecommendCards = (cartChannel: ICatalogChannel) => {
    const currentCard = recomendCards?.channels?.find(
      (card) => card.id === cartChannel?.id,
    );
    handleChangeCards(cartChannel, currentCard);
  };

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
    if (channel?.selected_format) {
      const cartChannel = { ...channel, selected_format: selectedValue };
      return handleChangeCards(
        cartChannel as unknown as ICatalogChannel,
        channel as unknown as ICatalogChannel,
      );
    }
  };

  const handleOnChangePage = () => {};

  return {
    isLoading,
    card,
    channel,
    selectedFormat,
    handleChangeFormat,
    handleChangeCartCards,
    isCartActionLoading,
    currentCart,
    role,
    isFetchingCart,
    screen,
    recomendCards,
    isRecommendCardsLoading,
    handleChangeRecommendCards,
    handleOnChangePage,
    projectId,
  };
};
