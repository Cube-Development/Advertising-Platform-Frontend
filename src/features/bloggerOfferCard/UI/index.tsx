import { ChatIcon, HappySmileIcon, MoreIcon } from "@shared/assets";
import { offerStatus, offerStatusChat } from "@shared/config/offerFilter";
import { IBloggerOfferCard } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BloggerOfferCardProps {
  card: IBloggerOfferCard;
  SeeLinkBtn: FC;
  SendLinkBtn: FC;
  AcceptOfferBtn: FC;
  RejectOfferBtn: FC;
  SeeReasonBtn: FC;
}

export const BloggerOfferCard: FC<BloggerOfferCardProps> = ({
  card,
  SeeLinkBtn,
  SendLinkBtn,
  AcceptOfferBtn,
  RejectOfferBtn,
  SeeReasonBtn,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.card} ${offerStatusChat.includes(card.status) ? styles.chat : styles.no__chat}`}
    >
      <div className={styles.card__info}>
        <div className={styles.card__info__data}>
          <div className={styles.card__info__data__description}>
            <img src={card.img} alt="" />
            <div>
              <p>{card.name}</p>
              <span>{card.category}</span>
            </div>
          </div>
          <div className={styles.card__info__data__date}>
            <span>№{card.id}</span>
            <span>{card.date}</span>
          </div>
        </div>
        <div className={styles.card__info__status}>
          <p>
            {card.status === offerStatus.active ? (
              t(`offers_blogger.card.status.active`)
            ) : card.status === offerStatus.check ? (
              t(`offers_blogger.card.status.check`)
            ) : card.status === offerStatus.wait ? (
              t(`offers_blogger.card.status.wait`)
            ) : card.status === offerStatus.complite ? (
              t(`offers_blogger.card.status.complite`)
            ) : card.status === offerStatus.cancel ? (
              t(`offers_blogger.card.status.cancel`)
            ) : card.status === offerStatus.moderation ? (
              t(`offers_blogger.card.status.moderation`)
            ) : card.status === offerStatus.uncomplite ? (
              t(`offers_blogger.card.status.reject`)
            ) : (
              <></>
            )}
          </p>
        </div>
      </div>

      <div className={styles.card__column}>
        <div className={styles.card__column__top}>
          <p>{t(`offers_blogger.card.date`)}</p>
          <span>
            {card.date_from} - {card.date_to}
          </span>
        </div>
        <div>
          <p>{t(`offers_blogger.card.accommodation`)}</p>
          <span>{card.accommodation}</span>
        </div>
      </div>
      <div className={styles.card__column}>
        <div className={styles.card__column__top}>
          <p>{t(`offers_blogger.card.time`)}</p>
          <span>
            {card.time_from} - {card.time_to}
          </span>
        </div>
        <div>
          <p>{t(`offers_blogger.card.price`)}</p>
          <span>
            {card.price.toLocaleString()} {t(`symbol`)}
          </span>
        </div>
      </div>
      <>
        {card.status === offerStatus.active ? (
          <div className={styles.card__active}>
            <div className={styles.card__active__title}>
              <p>{t(`offers_blogger.offer_status.active.title`)}</p>
              <span>11.11.2024 с 17:00 до 19:00 (UTC +5)</span>
            </div>
            <div className={styles.card__active__buttons}>
              <SeeLinkBtn />
              <SendLinkBtn />
            </div>
          </div>
        ) : card.status === offerStatus.check ? (
          <div className={styles.card__check}>
            <div>
              <p>{t(`offers_blogger.offer_status.check.title`)}</p>
              <span>{t(`offers_blogger.offer_status.check.text`)}</span>
            </div>
          </div>
        ) : card.status === offerStatus.wait ? (
          <div className={styles.card__wait}>
            <div className={styles.card__wait__title}>
              <p>{t(`offers_blogger.offer_status.wait.title`)}</p>
              <span>{t(`offers_blogger.offer_status.wait.text`)}</span>
            </div>
            <div className={styles.card__wait__buttons}>
              <div>
                <RejectOfferBtn />
                <AcceptOfferBtn />
              </div>
              <SeeLinkBtn />
            </div>
          </div>
        ) : card.status === offerStatus.complite ? (
          <div className={styles.card__complite}>
            <div>
              <HappySmileIcon />
            </div>
          </div>
        ) : card.status === offerStatus.cancel ? (
          <div className={styles.card__cancel}>
            <div>
              <p>{t(`offers_blogger.offer_status.cancel.title`)}</p>
              <span>{t(`offers_blogger.offer_status.cancel.text`)}</span>
            </div>
          </div>
        ) : card.status === offerStatus.moderation ? (
          <div className={styles.card__moderation}>
            <div>
              <span>{t(`offers_blogger.offer_status.moderation.text`)}</span>
            </div>
          </div>
        ) : card.status === offerStatus.uncomplite ? (
          <div className={styles.card__uncomplite}>
            <div className={styles.card__uncomplite__title}>
              <p>{t(`offers_blogger.offer_status.reject.title`)}</p>
              <span>{t(`offers_blogger.offer_status.reject.text`)}</span>
            </div>
            <div>
              <SeeReasonBtn />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      {offerStatusChat.includes(card.status) && (
        <div className={styles.card__more}>
          <div>
            <button>
              <MoreIcon />
            </button>
          </div>
          <div className={styles.chat__btn}>
            <button>
              <ChatIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
