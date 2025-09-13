import {
  ADMIN_CHANNEL_STATUS,
  IAdminChannelData,
  IAdminEditChannelData,
} from "@entities/admin";
import {
  BanChannel,
  RejectChannel,
  UnbanChannel,
  UpdateChannel,
} from "@features/admin-panel";
import { FC } from "react";

interface ICardButtonsProps {
  card: IAdminChannelData;
  formState: IAdminEditChannelData;
}

export const CardButtons: FC<ICardButtonsProps> = ({ card, formState }) => {
  return (
    <>
      {card?.status === ADMIN_CHANNEL_STATUS.ACTIVE ? (
        <>
          <BanChannel id={card?.channel?.id} />
          <UpdateChannel channel={formState} id={card?.channel?.id} />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.MODERATION ? (
        <>
          <RejectChannel id={card?.channel?.id} />
          <UpdateChannel channel={formState} id={card?.channel?.id} />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.BANNED ? (
        <>
          <UnbanChannel id={card?.channel?.id} />
          <UpdateChannel
            channel={formState}
            id={card?.channel?.id}
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
          <UpdateChannel channel={formState} id={card?.channel?.id} />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.REMODERATION ? (
        <>
          <div></div>
          <UpdateChannel channel={formState} id={card?.channel?.id} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
