import { Languages } from "@shared/config/languages";
import { pageFilter } from "@shared/config/pageFilter";
import { networkTypes } from "@shared/config/platformData";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { platformTypesNum } from "@shared/config/platformTypes";
import { useAppSelector } from "@shared/store";
import {
  getChannelsByStatusReq,
  useGetChannelsByStatusQuery,
} from "@shared/store/services/channelService";
import { IModerationChannelBlogger } from "@shared/types/channelStatus";
import { BarFilter } from "@widgets/barFilter";
import { BloggerModPlatform } from "@widgets/bloggerModPlatform";
import { BloggerPlatform } from "@widgets/bloggerPlatform";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const PlatformsPage: FC = () => {
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { statusFilter } = useAppSelector((state) => state.filter);

  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ platform: platformTypesNum }>({
    defaultValues: {
      platform: networkTypes[0].id,
    },
  });

  const platformType = watch("platform");

  const getParams: getChannelsByStatusReq = {
    platform: platformType,
    language: language?.id || Languages[0].id,
    page: 1,
    date_sort: "increase",
    status: statusFilter,
  };

  const {
    data: channels,
    isLoading,
    error,
  } = useGetChannelsByStatusQuery(getParams);

  return (
    <>
      <BarFilter
        page={pageFilter.platform}
        setValue={setValue}
        listLength={!channels?.channels.length}
      />

      {statusFilter === platformStatusFilter.active ? (
        <BloggerPlatform cards={channels!} />
      ) : statusFilter === platformStatusFilter.moderation ? (
        <BloggerModPlatform cards={channels! as IModerationChannelBlogger} />
      ) : statusFilter === platformStatusFilter.moderationReject ? (
        <BloggerPlatform cards={channels!} />
      ) : statusFilter === platformStatusFilter.inactive ? (
        <BloggerPlatform cards={channels!} />
      ) : (
        statusFilter === platformStatusFilter.banned && (
          <BloggerPlatform cards={channels!} />
        )
      )}
    </>
  );
};
