import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { VIEWS_BLOGGER_CHANNELS } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { channelAPI, getChannelsByStatusReq } from "../../api";
import { ENUM_CHANNEL_STATUS } from "../../config";
import { IChannelBlogger } from "./../../types";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof channelAPI.useGetChannelsByStatusQuery>[0];
  language: ILanguage;
  channel_id: string;
  status_from: ENUM_CHANNEL_STATUS;
  status_to: ENUM_CHANNEL_STATUS;
}

export const invalidateBloggerChannelsModerationDecision = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  channel_id,
  status_from,
  status_to,
}: Props) => {
  // 1. Удалим канал из кеша каналов на модерации/заблокированных
  const baseParams = {
    status: status_from,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
  };
  dispatch(
    channelAPI.util.updateQueryData(
      "getChannelsByStatus",
      baseParams as getChannelsByStatusReq,
      (draft: IChannelBlogger) => {
        draft.channels = draft.channels.filter((el) => el.id !== channel_id);
      },
    ),
  );

  // 2. Обновляем кэш каналов на активные / отмененные / заблокированные
  const params = {
    status: status_to,
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
