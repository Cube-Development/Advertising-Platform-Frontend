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
import styles from "./styles.module.scss";

interface ICardButtonsProps {
  card: IAdminChannelData;
  formState: IAdminEditChannelData;
}

export const CardButtons: FC<ICardButtonsProps> = ({ card, formState }) => {
  return (
    <div className={styles.buttons}>
      {card?.status === ADMIN_CHANNEL_STATUS.ACTIVE ? (
        <>
          <BanChannel id={card?.channel?.id} />
          <UpdateChannel channel={formState} id={card?.channel?.id} />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.MODERATION ? (
        <>
          <RejectChannel id={card?.channel?.id} />
          <AcceptChannel id={card?.channel?.id} channel={formState} />
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
          <AcceptChannel id={card?.channel?.id} channel={formState} />
        </>
      ) : card?.status === ADMIN_CHANNEL_STATUS.REMODERATION ? (
        <>
          <div></div>
          <AcceptRemoderation id={card?.channel?.id} channel={formState} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
