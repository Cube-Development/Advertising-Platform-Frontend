import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { VIEWS_BLOGGER_CHANNELS } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { channelAPI } from "../api";
import { channelStatusFilter } from "../config";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof channelAPI.useGetChannelsByStatusQuery>[0];
  language: ILanguage;
  role: ENUM_ROLES;
}

export const invalidateBloggerChannelsOnModeration = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  role,
}: Props) => {
  if (role !== ENUM_ROLES.BLOGGER) return;

  // 1. Обновляем кэш каналов на модерации
  const params = {
    status: channelStatusFilter.moderation,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_CHANNELS,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 2. Обновляем кэш кружочков
  dispatch(channelAPI.util.invalidateTags([VIEWS_BLOGGER_CHANNELS]));
};
