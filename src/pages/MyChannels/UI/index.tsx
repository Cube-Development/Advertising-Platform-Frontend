import {
  AllChannelTypes,
  IModerationChannel,
  channelStatusFilter,
  getChannelsByStatusReq,
  useGetChannelsByStatusQuery,
} from "@entities/channel";
import { platformTypes, platformTypesNum } from "@entities/platform";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { pageFilter } from "@shared/routing";
import { ActiveChannels, ModerationChannels } from "@widgets/channel";
import { BarFilter } from "@widgets/other";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const MyChannelsPage: FC = () => {
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { statusFilter } = useAppSelector((state) => state.filter);

  const { setValue, watch } = useForm<{ platform: platformTypesNum }>({
    defaultValues: {
      platform: platformTypes[0].id,
    },
  });
  const platformType = watch("platform");

  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getChannelsByStatusReq = {
    platform: platformType,
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.orders,
    date_sort: "increase",
    status: statusFilter,
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
  }, [platformType, statusFilter]);

  return (
    <>
      <BarFilter
        page={pageFilter.platform}
        setValue={setValue}
        listLength={!channels?.length}
      />

      {statusFilter === channelStatusFilter.active ? (
        <ActiveChannels
          cards={channels!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data
              ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
              : false
          }
        />
      ) : statusFilter === channelStatusFilter.moderation ? (
        <ModerationChannels
          cards={channels! as IModerationChannel[]}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data
              ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
              : false
          }
        />
      ) : statusFilter === channelStatusFilter.moderationReject ? (
        <ActiveChannels
          cards={channels!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data
              ? data?.channels?.length === INTERSECTION_ELEMENTS.orders
              : false
          }
        />
      ) : statusFilter === channelStatusFilter.inactive ? (
        <ActiveChannels
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
        statusFilter === channelStatusFilter.banned && (
          <ActiveChannels
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
