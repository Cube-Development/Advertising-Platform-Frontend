import { CheckDate } from "@entities/communication";
import {
  ENUM_OFFER_STATUS,
  ENUM_OFFER_STATUS_BACKEND,
  IBloggerOfferCard,
  OFFER_CHAT_LIST,
} from "@entities/offer";
import { platformToIcon, useGetPostQuery } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { AcceptOffer, RejectOffer, SeePost, SendLink } from "@features/offer";
import { MoreIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { CountdownTimer, SeeCancelReason, useToast } from "@shared/ui";
import { Chat } from "@widgets/communication";
import { CalendarClock, CircleCheckBig, FileText } from "lucide-react";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { CheckPost } from "@features/order";

interface OfferCardProps {
  card: IBloggerOfferCard;
  statusFilter: ENUM_OFFER_STATUS | string;
  sign: ReactNode;
}

export const OfferCard: FC<OfferCardProps> = ({ card, statusFilter, sign }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: post, error } = useGetPostQuery({ order_id: card?.id });

  if (error) {
    toast({
      variant: "error",
      title: t("toasts.orders_advertiser.reject_post.error"),
    });
    console.error("error: ", error);
  }
  return (
    <div
      className={`${styles.card} ${statusFilter === ENUM_OFFER_STATUS.ACTIVE ? styles.active__chat : ""} border__gradient`}
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
              <p className="truncate !text-[var(--Personal-colors-main)]">
                {card.project_name || "Project name"}
              </p>
              <span className="truncate !text-black">{card.name}</span>
              {/* <span className="truncate">{card.category}</span> */}
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
      {statusFilter === ENUM_OFFER_STATUS.ACTIVE && (
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
        {statusFilter === ENUM_OFFER_STATUS.ACTIVE &&
        card?.api_status === ENUM_OFFER_STATUS_BACKEND.in_progress ? (
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
              <div
                className={`${
                  CheckDate(
                    typeof card?.publish_date === "object"
                      ? card?.publish_date.date_to
                      : card?.publish_date,
                    card?.publish_time?.time_from,
                    card?.publish_time?.time_to,
                  )
                    ? ""
                    : "deactive"
                }`}
              >
                <SendLink order_id={card.id} />
              </div>
              <span className="!grid !grid-flow-row !gap-2">
                <SeePost post={post!} post_deeplink={card?.post_deeplink} />
                {card?.post_link && <CheckPost url={card?.post_link} />}
              </span>
            </div>
          </div>
        ) : statusFilter === ENUM_OFFER_STATUS.ACTIVE &&
          card?.api_status === ENUM_OFFER_STATUS_BACKEND.post_review ? (
          <div className={styles.card__check}>
            <div>
              <p>{t(`offers_blogger.offer_status.check.title`)}</p>
              <span>{t(`offers_blogger.offer_status.check.text`)}</span>
            </div>
            <span className="!grid !grid-flow-row !gap-2">
              <SeePost post={post!} post_deeplink={card?.post_deeplink} />
              {card?.post_link && <CheckPost url={card?.post_link} />}
            </span>
          </div>
        ) : statusFilter === ENUM_OFFER_STATUS.WAIT ? (
          <div className={styles.card__wait}>
            <div className={styles.card__wait__title}>
              <p>{t(`offers_blogger.offer_status.wait.title`)}</p>
            </div>
            <div className={styles.card__wait__buttons}>
              <div>
                <RejectOffer order_id={card.id} />
                {typeof card?.publish_date === "object" &&
                card?.publish_date &&
                "date_from" in card.publish_date ? (
                  <AcceptOffer order_id={card.id} dates={card.publish_date} />
                ) : (
                  <AcceptOffer order_id={card.id} />
                )}
              </div>
              <span className="!grid !grid-flow-row !gap-2">
                <SeePost post={post!} post_deeplink={card?.post_deeplink} />
                {card?.post_link && <CheckPost url={card?.post_link} />}
              </span>
            </div>
          </div>
        ) : statusFilter === ENUM_OFFER_STATUS.COMPLETED ? (
          <div className={styles.card__complete}>
            {card?.api_status === ENUM_OFFER_STATUS_BACKEND?.toSign ? (
              <>
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    <p>{t("offers_blogger.offer_status.complete.title")}</p>
                  </span>
                </div>
                {sign}
              </>
            ) : card?.api_status ===
              ENUM_OFFER_STATUS_BACKEND?.waitingForPayment ? (
              <div className="flex flex-col items-center gap-2 text-gray-600">
                <CalendarClock className="w-8 h-8 text-green-500" />
                <span className="text-sm font-medium text-center">
                  <p>{t("offers_blogger.offer_status.complete.wait")}</p>
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-600">
                <CircleCheckBig className="w-8 h-8 text-green-500" />
                <span className="text-sm font-medium text-center">
                  <p>{t("offers_blogger.offer_status.complete.signed")}</p>
                </span>
              </div>
            )}
            <span className="!grid !grid-flow-row !gap-2">
              <SeePost post={post!} post_deeplink={card?.post_deeplink} />
              {card?.post_link && <CheckPost url={card?.post_link} />}
            </span>
          </div>
        ) : statusFilter === ENUM_OFFER_STATUS.CANCELED ? (
          <div className={styles.card__cancel}>
            <div>
              <p>{t(`offers_blogger.offer_status.cancel.title`)}</p>
              <span>{t(`offers_blogger.offer_status.cancel.text`)}</span>
            </div>
            <span className="!grid !grid-flow-row !gap-2">
              <SeePost post={post!} post_deeplink={card?.post_deeplink} />
              {card?.post_link && <CheckPost url={card?.post_link} />}
              {card?.cancel_reason && (
                <SeeCancelReason reason={card?.cancel_reason} />
              )}
            </span>
          </div>
        ) : statusFilter === ENUM_OFFER_STATUS.MODERATION ? (
          <div className={styles.card__moderation}>
            <div>
              <span>{t(`offers_blogger.offer_status.moderation.text`)}</span>
            </div>
            <span className="!grid !grid-flow-row !gap-2">
              <SeePost post={post!} post_deeplink={card?.post_deeplink} />
              {card?.post_link && <CheckPost url={card?.post_link} />}
            </span>
          </div>
        ) : statusFilter === ENUM_OFFER_STATUS.UNFULFILLED ? (
          <div className={styles.card__uncomplete}>
            <div className={styles.card__uncomplete__title}>
              <p>{t(`offers_blogger.offer_status.reject.title`)}</p>
              <span>{t(`offers_blogger.offer_status.reject.text`)}</span>
            </div>
            <span className="!grid !grid-flow-row !gap-2">
              <SeePost post={post!} post_deeplink={card?.post_deeplink} />
              {card?.post_link && <CheckPost url={card?.post_link} />}
            </span>
            {/* <div>
              <SeeReason />
            </div> */}
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

        {OFFER_CHAT_LIST.includes(statusFilter as ENUM_OFFER_STATUS) && (
          <div className={`${styles.chat__btn} display__hide__max__md`}>
            <Chat orderId={card?.id} toRole={ENUM_ROLES.ADVERTISER} />
          </div>
        )}
      </div>
    </div>
  );
};
