import { Link } from "react-router-dom";
import { HappySmileIcon, MoreIcon } from "@shared/assets";
import { CountdownTimer, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Chat } from "@widgets/communication";
import { AcceptOffer, RejectOffer, SeePost, SendLink } from "@features/offer";
import { SeeReason } from "@features/other";
import {
  IBloggerOfferCard,
  offerStatus,
  offerStatusChat,
  offerStatusFilter,
} from "@entities/offer";
import { platformToIcon, useGetPostQuery } from "@entities/project";
import { CheckDate } from "@entities/communication";
import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";

interface OfferCardProps {
  card: IBloggerOfferCard;
  statusFilter: offerStatusFilter | string;
}

export const OfferCard: FC<OfferCardProps> = ({ card, statusFilter }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: post, error } = useGetPostQuery({ order_id: card?.id });

  // const post = {
  //   id: "string",
  //   platform: 1,
  //   comment: "string",
  //   photo: ["ff"],
  //   video: ["ff"],
  //   files: ["ff"],
  //   buttons: [
  //     {
  //       id: "string",
  //       content: "string",
  //       url: "string",
  //     },
  //   ],
  //   text: ["dd"],
  //   post_type: 1,
  // };

  if (error) {
    toast({
      variant: "error",
      title: t("toasts.orders_advertiser.reject_post.error"),
    });
    console.error("error: ", error);
  }
  return (
    <div
      className={`${styles.card} ${statusFilter === offerStatusFilter.active ? styles.active__chat : ""} border__gradient`}
    >
      <div className={styles.platform__icon}>
        {card?.platform && card?.platform in platformToIcon
          ? platformToIcon[card.platform!]()
          : "..."}
      </div>
      <div className={styles.card__description}>
        <div className={styles.card__description__data}>
          <Link
            to={`${ENUM_PATHS.CHANNEL.replace(":id", card?.channel_id || card?.id)}`}
            target="_blank"
            className={styles.description}
          >
            <img src={card.avatar} alt="" />
            <div>
              <p className="truncate">{card.name}</p>
              <span className="truncate">{card.category}</span>
            </div>
          </Link>
          <div className={styles.date}>
            <span>№{card.identifier}</span>
            <span>{card.date_accept}</span>
          </div>
        </div>
        <div className={styles.card__description__status}>
          <p>{card.order_status}</p>
        </div>
      </div>
      {statusFilter === offerStatusFilter.active && (
        <div className={`${styles.chat__btn} display__hide__min__md`}>
          <Chat orderId={card.id} toRole={ENUM_ROLES.ADVERTISER} />
        </div>
      )}
      <div className={styles.card__info}>
        <div className={styles.info}>
          <p>{t(`offers_blogger.card.price`)}</p>
          <span className="truncate">
            {card.price.toLocaleString()} {t(`symbol`)}
          </span>
        </div>
        <div className={styles.info}>
          <p>{t(`offers_blogger.card.time`)}</p>
          <span className="truncate">
            {card.publish_time?.time_from} - {card.publish_time?.time_to}
          </span>
        </div>

        <div className={styles.info}>
          <p>{t(`offers_blogger.card.accommodation`)}</p>
          <span className="truncate">{card.format?.small}</span>
        </div>
        <div className={styles.info}>
          <p>{t(`offers_blogger.card.date`)}</p>
          <span>
            {typeof card?.publish_date === "object"
              ? card?.publish_date?.date_from +
                " - " +
                card?.publish_date.date_to
              : card?.publish_date}
          </span>
        </div>
      </div>
      <>
        {statusFilter === offerStatusFilter.active &&
        card?.api_status === offerStatus.in_progress ? (
          <div className={styles.card__active}>
            <div className={styles.card__active__title}>
              <p>{t(`offers_blogger.offer_status.active.title`)}</p>
              <div className={styles.tarif}>
                {typeof card?.publish_date === "string" && (
                  <CountdownTimer
                    date_to={card?.publish_date}
                    time={card?.publish_time?.time_to}
                  />
                )}
              </div>
            </div>
            <div className={styles.card__active__buttons}>
              <SeePost post={post!} />
              <div
                className={`${CheckDate(typeof card?.publish_date === "object" ? card?.publish_date.date_to : card?.publish_date) ? "" : "deactive"}`}
              >
                <SendLink order_id={card.id} />
              </div>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.active &&
          card?.api_status === offerStatus.post_review ? (
          <div className={styles.card__check}>
            <div>
              <p>{t(`offers_blogger.offer_status.check.title`)}</p>
              <span>{t(`offers_blogger.offer_status.check.text`)}</span>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.wait ? (
          <div className={styles.card__wait}>
            <div className={styles.card__wait__title}>
              <p>{t(`offers_blogger.offer_status.wait.title`)}</p>
            </div>
            <div className={styles.card__wait__buttons}>
              <div>
                <RejectOffer order_id={card.id} />
                {typeof card?.publish_date === "object" &&
                "date_from" in card?.publish_date ? (
                  <AcceptOffer order_id={card.id} dates={card.publish_date} />
                ) : (
                  <AcceptOffer order_id={card.id} />
                )}
              </div>
              <SeePost post={post!} />
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.completed ? (
          <div className={styles.card__complete}>
            <HappySmileIcon className="active__icon" />
            <p>{t("offers_blogger.offer_status.complete.title")}</p>
          </div>
        ) : statusFilter === offerStatusFilter.canceled ? (
          <div className={styles.card__cancel}>
            <div>
              <p>{t(`offers_blogger.offer_status.cancel.title`)}</p>
              <span>{t(`offers_blogger.offer_status.cancel.text`)}</span>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.moderation ? (
          <div className={styles.card__moderation}>
            <div>
              <span>{t(`offers_blogger.offer_status.moderation.text`)}</span>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.unfulfilled ? (
          <div className={styles.card__uncomplete}>
            <div className={styles.card__uncomplete__title}>
              <p>{t(`offers_blogger.offer_status.reject.title`)}</p>
              <span>{t(`offers_blogger.offer_status.reject.text`)}</span>
            </div>
            <div>
              <SeeReason />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      <div className={styles.card__more}>
        <div>
          <button>
            <MoreIcon />
          </button>
        </div>

        {offerStatusChat.includes(statusFilter as offerStatusFilter) && (
          <div className={`${styles.chat__btn} display__hide__max__md`}>
            <Chat orderId={card?.id} toRole={ENUM_ROLES.ADVERTISER} />
          </div>
        )}
      </div>
    </div>
  );
};
