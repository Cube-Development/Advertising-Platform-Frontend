import {
  channelData,
  channelStatusFilter,
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
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { pageFilter, paths } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

// Ленивый импорт компонентов
const ActiveChannels = React.lazy(() =>
  import("@widgets/channel").then((module) => ({
    default: module.ActiveChannels,
  })),
);
const ModerationChannels = React.lazy(() =>
  import("@widgets/channel").then((module) => ({
    default: module.ModerationChannels,
  })),
);

export const MyChannelsPage: FC = () => {
  useClearCookiesOnPage();
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { channel_status } = QueryParams();

  const { setValue, watch } = useForm<{
    platform: platformTypesNum;
    status: channelStatusFilter | string;
    page: number;
    search_string?: string;
  }>({
    defaultValues: {
      platform: platformTypes[0].id,
      status:
        channel_status &&
        !!Object.values(channelStatusFilter).includes(
          channel_status as channelStatusFilter,
        )
          ? channel_status
          : channelStatusFilter.active,
      page: 1,
      search_string: "",
    },
  });
  const formState = watch();
  const getParams: getChannelsByStatusReq = {
    language: language?.id || Languages[0].id,
    page: formState.page,
    elements_on_page: INTERSECTION_ELEMENTS.myChannels,
    date_sort: dateSortingTypes.decrease,
    status: formState.status,
    ...(formState?.search_string && formState?.search_string?.length >= 3
      ? { search_string: formState.search_string }
      : {}),
  };

  const { data, isFetching } = useGetChannelsByStatusQuery(getParams);
  const { refetch: views } = useGetViewBloggerChannelQuery();

  useEffect(() => {
    if (status !== channelStatusFilter.inactive) {
      views();
    }
  }, [status, formState.page]);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.platform, formState.status, formState.search_string]);

  useEffect(() => {
    const newPath = buildPathWithQuery(paths.myChannels, {
      [queryParamKeys.channelStatus]: formState.status,
    });
    navigate(newPath, { replace: true });
  }, [formState.status]);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container">
        <div className={styles.wrapper}>
          <BarFilter
            page={pageFilter.platform}
            setValue={setValue}
            listLength={!data?.channels?.length}
            changeStatus={(status) => setValue("status", status)}
            statusFilter={formState.status}
          />
          <SearchFilter type={channelData.search} onChange={setValue} />
          {formState.status !== channelStatusFilter.moderation ? (
            <ActiveChannels
              cards={
                (formState.status === data?.status && data?.channels) || []
              }
              handleOnChangePage={() => setValue("page", formState?.page + 1)}
              isLoading={isFetching}
              isLast={data?.isLast || false}
              statusFilter={formState.status as channelStatusFilter}
            />
          ) : (
            <ModerationChannels
              statusFilter={formState.status}
              cards={
                ((formState.status === data?.status &&
                  data?.channels) as IModerationChannel[]) || []
              }
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
