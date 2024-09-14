import {
  IModerationChannel,
  channelStatusFilter,
  getChannelsByStatusReq,
  useGetChannelsByStatusQuery,
} from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import { platformTypes, platformTypesNum } from "@entities/platform";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { ActiveChannels, ModerationChannels } from "@widgets/channel";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
    platform: formState.platform,
    language: language?.id || Languages[0].id,
    page: formState.page,
    elements_on_page: INTERSECTION_ELEMENTS.myChannels,
    date_sort: "increase",
    status: formState.status,
  };

  const { data, isFetching } = useGetChannelsByStatusQuery(getParams);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [platform, status]);

  return (
    <div className="container sidebar">
      <BarFilter
        page={pageFilter.platform}
        setValue={setValue}
        listLength={!data?.channels?.length}
        changeStatus={(status) => setValue("status", status)}
        statusFilter={formState.status}
      />

      {formState.status !== channelStatusFilter.moderation ? (
        <ActiveChannels
          cards={data?.channels || []}
          handleOnChangePage={() => setValue("page", page + 1)}
          isLoading={isFetching}
          isLast={data?.isLast || false}
          statusFilter={formState.status}
        />
      ) : (
        <ModerationChannels
          statusFilter={formState.status}
          cards={data?.channels as IModerationChannel[]}
          handleOnChangePage={() => setValue("page", page + 1)}
          isLoading={isFetching}
          isLast={data?.isLast || false}
        />
      )}
    </div>
  );
};
