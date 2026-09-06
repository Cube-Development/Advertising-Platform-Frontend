import {
  ADMIN_CHANNEL_STATUS,
  IAdminChannelData,
  IAdminEditChannelData,
} from "@entities/admin-panel";
import {
  AcceptChannel,
  AcceptRemoderation,
  BanChannel,
  RejectChannel,
  UnbanChannel,
  UpdateChannel,
} from "@features/admin-panel";
import { FC } from "react";

interface ICardButtonsProps {
  card: IAdminChannelData;
  formState: IAdminEditChannelData;
  isEdited?: boolean;
}

export const CardButtons: FC<ICardButtonsProps> = ({
  card,
  formState,
  isEdited = true,
}) => {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {card?.status === ADMIN_CHANNEL_STATUS.ACTIVE ? (
        <>
          <BanChannel id={card?.channel?.id} />
          <UpdateChannel channel={formState} id={card?.channel?.id} />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.MODERATION ? (
        <>
          <RejectChannel id={card?.channel?.id} />
          <AcceptChannel
            id={card?.channel?.id}
            channel={formState}
            isEdited={isEdited}
          />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.BANNED ? (
        <>
          <UnbanChannel
            id={card?.channel?.id}
            channel={formState}
            isEdited={isEdited}
          />
          <UpdateChannel
            id={card?.channel?.id}
            channel={formState}
            disabled={true}
          />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.INACTIVE ? (
        <>
          <BanChannel id={card?.channel?.id} />
          <UpdateChannel channel={formState} id={card?.channel?.id} />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.MODERATION_REJECT ? (
        <>
          <RejectChannel id={card?.channel?.id} />
          <AcceptChannel
            id={card?.channel?.id}
            channel={formState}
            isEdited={isEdited}
          />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.REMODERATION ? (
        <AcceptRemoderation id={card?.channel?.id} channel={formState} />
      ) : null}
    </div>
  );
};
