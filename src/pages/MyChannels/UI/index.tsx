import {
  channelStatusFilter,
  getChannelsByStatusReq,
  IModerationChannel,
  useGetChannelsByStatusQuery,
} from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import {
  dateSortingTypes,
  platformTypes,
  platformTypesNum,
} from "@entities/platform";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { ActiveChannels, ModerationChannels } from "@widgets/channel";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const MyChannelsPage: FC = () => {
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { setValue, watch } = useForm<{
    platform: platformTypesNum;
    status: channelStatusFilter | offerStatusFilter | string;
    page: number;
  }>({
    defaultValues: {
      platform: platformTypes[0].id,
      status: channelStatusFilter.active,
      page: 1,
    },
  });
  const formState = watch();
  const { platform, status, page } = formState;

  const getParams: getChannelsByStatusReq = {
    language: language?.id || Languages[0].id,
    page: formState.page,
    elements_on_page: INTERSECTION_ELEMENTS.myChannels,
    date_sort: dateSortingTypes.decrease,
    status: formState.status,
  };

  // unmock
  const { data, isFetching } = useGetChannelsByStatusQuery(getParams);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [platform, status]);
  // unmock

  // mock
  // const data =
  //   formState.status === channelStatusFilter.active
  //     ? activeChannelsMock
  //     : formState.status === channelStatusFilter.banned
  //       ? blockedChannelsMock
  //       : formState.status === channelStatusFilter.inactive
  //         ? inactiveChannelsMock
  //         : formState.status === channelStatusFilter.moderation
  //           ? moderationChannelsMock
  //           : moderationRejectChannelsMock;
  // const isFetching = false;
  //mock

  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <BarFilter
          page={pageFilter.platform}
          setValue={setValue}
          listLength={!data?.channels?.length}
          changeStatus={(status) => setValue("status", status)}
          statusFilter={formState.status}
        />

        {formState.status !== channelStatusFilter.moderation ? (
          <ActiveChannels
            cards={(formState.status === data?.status && data?.channels) || []}
            handleOnChangePage={() => setValue("page", page + 1)}
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
            handleOnChangePage={() => setValue("page", page + 1)}
            isLoading={isFetching}
            isLast={data?.isLast || false}
          />
        )}
      </div>
    </div>
  );
};
