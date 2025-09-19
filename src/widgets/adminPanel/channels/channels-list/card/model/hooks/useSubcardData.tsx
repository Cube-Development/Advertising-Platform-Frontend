import {
  IAdminChannelData,
  IAdminEditChannelData,
  useGetAdminChannelInfoQuery,
} from "@entities/admin-panel";
import { IFormat } from "@entities/project";
import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";

interface Props {
  card: IAdminChannelData;
  reset: UseFormReset<IAdminEditChannelData>;
}

export const useSubcardData = ({ card, reset }: Props) => {
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const [startData, setStartData] = useState<IAdminEditChannelData>();
  const { data: channel, isLoading } = useGetAdminChannelInfoQuery(
    { id: card?.channel?.id },
    {
      skip: !isSubcardOpen,
    },
  );

  useEffect(() => {
    if (channel) {
      const data = {
        channel_id: card?.channel?.id,
        male: channel?.male,
        female: channel?.female,
        category: channel?.category?.id,
        description: channel?.description,
        text_limit: channel?.text_limit,
        region: channel?.region?.map((item) => item?.id),
        language: channel?.language?.map((item) => item?.id),
        age: channel?.age?.map((item) => item?.id),
        format: channel?.format?.map((format: IFormat) => ({
          name: format?.format,
          price: format?.price,
        })),
      };

      setStartData({
        ...data,
      });
      reset({
        ...data,
      });
    }
  }, [channel, reset]);

  return {
    isSubcardOpen,
    setSubcardOpen,
    channel,
    startData,
    isLoading,
  };
};
