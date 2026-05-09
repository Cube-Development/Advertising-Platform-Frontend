import { useState, useEffect } from "react";
import { useGetChannelByIdQuery, IReadChannelData } from "@entities/channel";
import { IFormat } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";

interface UseChannelDataOptions {
  channel_id?: string;
  language?: number;
  userId?: string;
  guestId?: string;
  projectId?: string | null;
  role?: ENUM_ROLES | null;
}

export const useChannelData = ({
  channel_id,
  language,
  userId,
  guestId,
  projectId,
  role,
}: UseChannelDataOptions) => {
  const baseParams = {
    channel_id: channel_id || "",
    language: language || USER_LANGUAGES_LIST[0].id,
  };

  const channelInfoParams =
    !!projectId && !!userId
      ? {
          ...baseParams,
          project_id: projectId,
        }
      : !!userId && role !== ENUM_ROLES.MANAGER && role !== ENUM_ROLES.AGENCY
        ? { ...baseParams, user_id: userId }
        : { ...baseParams, guest_id: guestId };

  const { data: card, isLoading } = useGetChannelByIdQuery(channelInfoParams);

  const [channel, setChannel] = useState<IReadChannelData>(card!);
  const [selectedFormat, setSelectedFormat] = useState<IFormat | null>(
    card?.selected_format || null,
  );

  useEffect(() => {
    if (card) {
      setChannel(card);
      if (card.selected_format) {
        setSelectedFormat(card.selected_format);
      } else {
        setSelectedFormat(card.format?.[0]);
      }
    }
  }, [card]);

  return {
    card,
    isLoading,
    channel,
    setChannel,
    selectedFormat,
    setSelectedFormat,
  };
};
