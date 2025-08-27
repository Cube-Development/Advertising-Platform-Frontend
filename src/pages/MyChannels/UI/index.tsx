import {
  channelData,
  ENUM_CHANNEL_STATUS,
  getChannelsByStatusReq,
  IModerationChannel,
  useGetChannelsByStatusQuery,
} from "@entities/channel";
import {
  dateSortingTypes,
  platformTypes,
  platformTypesNum,
} from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { useGetViewBloggerChannelQuery } from "@entities/views";
import { SearchFilter } from "@features/catalog";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useClearCookiesOnPage } from "@shared/hooks";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { validate as isValidUUID } from "uuid";

// Ленивый импорт компонентов
const ActiveChannels = React.lazy(() =>
  import("@widgets/channel")
    .then((module) => ({
      default: module.ActiveChannels,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);
const ModerationChannels = React.lazy(() =>
  import("@widgets/channel")
    .then((module) => ({
      default: module.ModerationChannels,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

interface IForm extends getChannelsByStatusReq {
  platform: platformTypesNum;
}

export const MyChannelsPage: FC = () => {
  useClearCookiesOnPage();
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { channel_status, channel_id } = QueryParams();

  const startStatus =
    channel_status &&
    !!Object.values(ENUM_CHANNEL_STATUS).includes(
      channel_status as ENUM_CHANNEL_STATUS,
    )
      ? channel_status
      : ENUM_CHANNEL_STATUS.ACTIVE;

  const startChannelId = isValidUUID(channel_id || "") ? channel_id : undefined;

  const { setValue, watch } = useForm<IForm>({
    defaultValues: {
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_CHANNELS,
      status: startStatus,
      date_sort: dateSortingTypes.decrease,
      platform: platformTypes[0].id,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      ...(startChannelId ? { search_string: startChannelId } : {}),
    },
  });
  const formState = watch();
  const { platform, search_string, ...params } = formState;

  const getParams: getChannelsByStatusReq = {
    ...params,
    ...(search_string && search_string.length >= 3
      ? isValidUUID(search_string)
        ? { channel_id: search_string }
        : { search_string }
      : {}),
  };

  const { data, isFetching } = useGetChannelsByStatusQuery(getParams, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: (data?.status === formState?.status && data) || undefined,
    }),
  });

  const { refetch: views } = useGetViewBloggerChannelQuery();

  useEffect(() => {
    if (formState.status !== ENUM_CHANNEL_STATUS.INACTIVE) {
      views();
    }
  }, [formState.status, formState.page]);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.platform, formState.status, formState.search_string]);

  useEffect(() => {
    setValue("search_string", "");
    const newPath = buildPathWithQuery(ENUM_PATHS.MY_CHANNELS, {
      [queryParamKeys.channelStatus]: formState.status,
      ...(startChannelId ? { [queryParamKeys.channelId]: startChannelId } : {}),
    });
    navigate(newPath, { replace: true });
  }, [formState.status]);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container">
        <div className={styles.wrapper}>
          <BarFilter
            page={ENUM_PAGE_FILTER.PLATFORM}
            setValue={setValue}
            listLength={!data?.channels?.length}
            changeStatus={(status) => setValue("status", status)}
            statusFilter={formState.status}
          />
          <SearchFilter
            type={channelData.search}
            onChange={setValue}
            value={formState.search_string}
          />
          {formState.status !== ENUM_CHANNEL_STATUS.MODERATION ? (
            <ActiveChannels
              cards={data?.channels || []}
              handleOnChangePage={() => setValue("page", formState?.page + 1)}
              isLoading={isFetching}
              isLast={data?.isLast || false}
              statusFilter={formState.status as ENUM_CHANNEL_STATUS}
            />
          ) : (
            <ModerationChannels
              statusFilter={formState.status}
              cards={(data?.channels as IModerationChannel[]) || []}
              handleOnChangePage={() => setValue("page", formState?.page + 1)}
              isLoading={isFetching}
              isLast={data?.isLast || false}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
};
