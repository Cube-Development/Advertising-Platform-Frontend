import {
  AllChannelTypes,
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
import { FC, useEffect, useState } from "react";
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
  }>({
    defaultValues: {
      platform: platformTypes[0].id,
      status: channelStatusFilter.active,
    },
  });
  const formState = watch();

  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getChannelsByStatusReq = {
    platform: formState.platform,
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.orders,
    date_sort: "increase",
    status: formState.status,
  };

  const { data, isFetching } = useGetChannelsByStatusQuery(getParams);

  const [channels, setChannels] = useState<AllChannelTypes[]>(
    data?.channels ? data?.channels : [],
  );

  useEffect(() => {
    if (data && currentPage !== 1) {
      setChannels([...channels, ...data.channels]);
    } else {
      data && setChannels(data.channels);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [formState]);

  return (
    <>
      <BarFilter
        page={pageFilter.platform}
        setValue={setValue}
        listLength={!channels?.length}
        changeStatus={(status) => setValue("status", status)}
        statusFilter={formState.status}
      />

      {formState.status === channelStatusFilter.active ? (
        <ActiveChannels
          cards={channels!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data
              ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
              : false
          }
          statusFilter={formState.status}
        />
      ) : formState.status === channelStatusFilter.moderation ? (
        <ModerationChannels
          statusFilter={formState.status}
          cards={channels! as IModerationChannel[]}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data
              ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
              : false
          }
        />
      ) : formState.status === channelStatusFilter.moderationReject ? (
        <ActiveChannels
          statusFilter={formState.status}
          cards={channels!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data
              ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
              : false
          }
        />
      ) : formState.status === channelStatusFilter.inactive ? (
        <ActiveChannels
          statusFilter={formState.status}
          cards={channels!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data
              ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
              : false
          }
        />
      ) : (
        formState.status === channelStatusFilter.banned && (
          <ActiveChannels
            statusFilter={formState.status}
            cards={channels!}
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetching}
            isNotEmpty={
              data
                ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
                : false
            }
          />
        )
      )}
    </>
  );
};
