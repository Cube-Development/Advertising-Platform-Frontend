import {
  adminChannelStatus,
  channelStatus,
  IAdminChannelData,
} from "@entities/admin";
import { platformTypes } from "@entities/platform";
import {
  AcceptChannel,
  BanChannel,
  RejectChannel,
  UpdateChannel,
} from "@features/adminPanel";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast,
} from "@shared/ui";
import { FC, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChannelCardProps {
  card: IAdminChannelData;
  accordionRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
}

export const ChannelCard: FC<ChannelCardProps> = ({
  card,
  accordionRefs,
  index,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCopyLink = (text: string = "") => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.default"),
    });
  };

  return (
    <AccordionItem
      value={`item-adminChannel-${card?.id}`}
      className={styles.wrapper}
      ref={(el) => (accordionRefs.current[index] = el)}
    >
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <img src={card?.avatar || ""} alt="channel_avatar" />
          </div>
          <div className={styles.title}>
            <p className="truncate">{card?.name}</p>
            <span className="truncate" onClick={() => handleCopyLink(card?.id)}>
              # {card?.id}
            </span>
          </div>
        </div>
        <div className={styles.column}>
          <p className="truncate">№{card?.owner}</p>
        </div>
        <div className={styles.column}>
          <p>
            {t(
              platformTypes.find((item) => item.id === card?.platform)?.name ||
                "",
            )}
          </p>
        </div>
        <div className={styles.column}>
          <p>{card?.date}</p>
        </div>
        <div
          className={`${styles.status} ${
            card?.status === channelStatus.active
              ? styles.active
              : card?.status === channelStatus.moderation
                ? styles.moderation
                : card?.status === channelStatus.banned
                  ? styles.banned
                  : card?.status === channelStatus.inactive
                    ? styles.inactive
                    : styles.moderationReject
          }`}
        >
          <p className="truncate">
            {t(
              adminChannelStatus.find((item) => item.id === card?.status)
                ?.name || "",
            )}
          </p>
        </div>
        <div className={styles.settings}>
          <div>|||</div>
          <AccordionTrigger className={styles.trigger}>
            <div className="arrow">
              <ArrowSmallVerticalIcon className="icon__grey rotate__down" />
            </div>
          </AccordionTrigger>
        </div>
      </div>
      <AccordionContent className={styles.content}>
        <div className={styles.info}>
          <div className={styles.info__top}>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.rate")}:</p>
              <span>{card?.rate || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.complete")}:</p>
              <span>{card?.complete || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.complaints")}:</p>
              <span>{card?.complaints || 0}</span>
            </div>
          </div>
          <div className={styles.info__bottom}>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.on_hold")}:</p>
              <span>{card?.on_hold || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.cancel")}:</p>
              <span>{card?.cancel || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.not_complete")}:</p>
              <span>{card?.not_complete || 0}</span>
            </div>
            <div className={styles.block}>
              <p>{t("admin_panel.channels.card.in_progress")}:</p>
              <span>{card?.in_progress || 0}</span>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <p>{t("admin_panel.channels.card.description")}</p>
          <div>
            <span>{card?.description}</span>
          </div>
        </div>
        <div className={styles.buttons}>
          {card?.status === channelStatus.active ? (
            <>
              <BanChannel id={card?.id} />
              <UpdateChannel id={card?.id} />
            </>
          ) : card?.status === channelStatus.moderation ? (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          ) : card?.status === channelStatus.banned ? (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          ) : card?.status === channelStatus.inactive ? (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          ) : (
            <>
              <RejectChannel id={card?.id} />
              <AcceptChannel id={card?.id} />
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
