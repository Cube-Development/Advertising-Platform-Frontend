import {
  ADMIN_CHANNEL_STATUS,
  ADMIN_CHANNEL_STATUS_LIST,
  IAdminChannelData,
} from "@entities/admin-panel";
import { platformToIcon } from "@entities/project";
import { ChannelCardMenu } from "@features/admin-panel";
import { useCopyLink } from "@shared/hooks";
import { AccordionTrigger, AccountsLoader } from "@shared/ui";
import { ChevronDown } from "lucide-react";
import { ButtonHTMLAttributes, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";

interface ICardTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  card: IAdminChannelData;
  isLoading?: boolean;
  isOpen?: boolean;
}

export const CardTrigger: FC<ICardTriggerProps> = ({
  card,
  isLoading,
  isOpen,
  ...props
}) => {
  const { t } = useTranslation();
  const { copyLink } = useCopyLink();
  const statusStyles = useMemo(() => {
    return card?.status === ADMIN_CHANNEL_STATUS.ACTIVE
      ? styles.active
      : card?.status === ADMIN_CHANNEL_STATUS.MODERATION
        ? styles.moderation
        : card?.status === ADMIN_CHANNEL_STATUS.BANNED
          ? styles.banned
          : card?.status === ADMIN_CHANNEL_STATUS.INACTIVE
            ? styles.inactive
            : card?.status === ADMIN_CHANNEL_STATUS.MODERATION_REJECT
              ? styles.moderationReject
              : styles.remoderation;
  }, [card?.status]);

  return (
    <div className={styles.top}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img
            src={card?.channel?.avatar || noUserAvatar}
            alt="channel_avatar"
          />
        </div>
        <div className={styles.title}>
          <p className="truncate">{card?.channel?.name}</p>
          <span
            className="truncate"
            onClick={() => copyLink(card?.channel?.id)}
          >
            # {card?.channel?.id}
          </span>
        </div>
      </div>
      <div className={`${styles.column} ${styles.user}`}>
        <p className="truncate" onClick={() => copyLink(card?.owner_id)}>
          №{card?.owner_id}
        </p>
      </div>
      <div className={styles.column}>
        {card?.channel?.platform &&
        card?.channel?.platform in platformToIcon ? (
          <div className="w-[26px] h-[26px] flex items-center justify-center [&_svg]:w-[26px] [&_svg]:h-[26px]">
            {platformToIcon[card.channel.platform]()}
          </div>
        ) : null}
      </div>
      <div className={styles.column}>
        <p>{card?.created}</p>
      </div>
      <div className={`${styles.status} ${statusStyles}`}>
        <p className="truncate">
          {t(
            ADMIN_CHANNEL_STATUS_LIST.find((item) => item.id === card?.status)
              ?.name || "???",
          )}
        </p>
      </div>
      <div className={styles.settings}>
        <ChannelCardMenu id={card?.channel?.id} />
        <AccordionTrigger className={styles.trigger} {...props}>
          {isLoading ? (
            <div className={styles.loader}>
              <AccountsLoader />
            </div>
          ) : (
            <ChevronDown
              size={20}
              className={`trigger-chevron w-5 h-5 text-gray-400 transition-transform duration-350 flex-shrink-0 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </AccordionTrigger>
      </div>
    </div>
  );
};
