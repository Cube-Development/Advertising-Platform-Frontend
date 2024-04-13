import {
  EyeIcon,
  ManIcon,
  RatingIcon,
  SubsIcon,
  WomanIcon,
} from "@shared/assets";
import { orderStatus, orderStatusChat } from "@shared/config/orderFilter";
import { projectTypesFilter } from "@shared/config/projectFilter";
import { IChannelChat } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IAdvProjectSubcard } from "@shared/types/advProject";

interface AdvProjectSubcardProps {
  subcard: IAdvProjectSubcard;
  FeedbackBtn: FC;
  AcceptBtn: FC;
  RejectBtn: FC;
  CheckBtn: FC;
  SeeBtn: FC;
  ChangeChannelBtn: FC;
  ChannelChatBtn: FC<IChannelChat>;
  status: orderStatus;
  typeFilter: string;
}

export const AdvProjectSubcard: FC<AdvProjectSubcardProps> = ({
  subcard,
  FeedbackBtn,
  AcceptBtn,
  RejectBtn,
  CheckBtn,
  SeeBtn,
  ChannelChatBtn,
  ChangeChannelBtn,
  status,
  typeFilter,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.subcard}>
      <div className={styles.subcard__left}>
        <div className={styles.subcard__left__description}>
          <div className={styles.subcard__left__description__logo}>
            <img src={`/images/partners/${subcard.img}`} alt="" />
          </div>
          <div className={styles.subcard__left__description__rate}>
            <RatingIcon />
          </div>
          <div className={styles.subcard__left__description__title}>
            <p>{subcard.name}</p>
            <span>{subcard.category}</span>
          </div>
        </div>
        <div className={styles.subcard__left__info}>
          <div className={styles.subcard__left__info__top}>
            <p>{t(`orders_advertiser.subcard.date`)}</p>
            <span>
              {subcard.date_from} - {subcard.date_to}
            </span>
          </div>
          <div>
            <p>{t(`orders_advertiser.subcard.accommodation`)}</p>
            <span>{subcard.accommodation}</span>
          </div>
        </div>
        <div className={styles.subcard__left__info}>
          <div className={styles.subcard__left__info__top}>
            <p>{t(`orders_advertiser.subcard.time`)}</p>
            <span>
              {subcard.time_from} - {subcard.time_to}
            </span>
          </div>
          <div>
            <p>{t(`orders_advertiser.subcard.price`)}</p>
            <span>
              {subcard.price.toLocaleString()} {t(`symbol`)}
            </span>
          </div>
        </div>
        <div className={styles.subcard__left__data}>
          <div className={styles.subcard__left__data__row}>
            <div className={styles.info}>
              <div>
                <SubsIcon />
              </div>
              <span>{subcard.subs.toLocaleString()}</span>
            </div>
            <div className={styles.info}>
              <div>
                <EyeIcon />
              </div>
              <span>{subcard.views.toLocaleString()}</span>
            </div>
          </div>
          <div className={styles.subcard__left__data__middle}>
            <div>
              <ManIcon />
            </div>
            <div
              className="colorline"
              style={{ "--male": `${20}%` } as React.CSSProperties}
              data-male={`${20}%`}
              data-female={`${80}%`}
            />
            <div>
              <WomanIcon />
            </div>
          </div>
          <div className={styles.subcard__left__data__row}>
            <div className={styles.info}>
              <p>ER:</p>
              <span>{subcard.ER}%</span>
            </div>
            <div className={styles.info}>
              <p>CPV:</p>
              <span>
                {subcard.CPV.toLocaleString()} {t(`symbol`)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <>
        {subcard.status === orderStatus.rejected ? (
          <div className={styles.subcard__active}>
            <div>
              <p>{t(`orders_advertiser.order_status.rejected.title`)}</p>
              <span>
                {typeFilter === projectTypesFilter.managerProject
                  ? t(`orders_advertiser.order_status.rejected.text2`)
                  : status === orderStatus.completed ||
                    t(`orders_advertiser.order_status.rejected.text`)}
              </span>
            </div>
          </div>
        ) : subcard.status === orderStatus.completed ? (
          <div className={styles.subcard__completed}>
            <div>
              <p>{t(`orders_advertiser.order_status.completed.title`)}</p>
              <FeedbackBtn />
            </div>
          </div>
        ) : subcard.status === orderStatus.post_review ? (
          <div className={styles.subcard__posted}>
            <div className={styles.subcard__posted__title}>
              <p>{t(`orders_advertiser.order_status.posted.title`)}</p>
              {typeFilter === projectTypesFilter.managerProject || (
                <span>{t(`orders_advertiser.order_status.posted.text`)}</span>
              )}
            </div>
            <div className={styles.subcard__posted__buttons}>
              {typeFilter === projectTypesFilter.managerProject || (
                <div className={styles.subcard__posted__buttons__top}>
                  <AcceptBtn />
                  <RejectBtn />
                </div>
              )}
              <CheckBtn />
            </div>
          </div>
        ) : subcard.status === orderStatus.in_progress ? (
          <div className={styles.subcard__accepted}>
            <p>{t(`orders_advertiser.order_status.accepted.title`)}</p>
            {typeFilter === projectTypesFilter.managerProject || (
              <span>{t(`orders_advertiser.order_status.accepted.text`)}</span>
            )}
            <SeeBtn />
          </div>
        ) : subcard.status === orderStatus.moderation ? (
          <div className={styles.subcard__moderation}>
            <div>
              <p>{t(`orders_advertiser.order_status.moderation.title`)}</p>
              <span>
                {t(`orders_advertiser.order_status.moderation.text`)}
                <small>
                  {t(`orders_advertiser.order_status.moderation.small`)}
                </small>
              </span>
            </div>
          </div>
        ) : subcard.status === orderStatus.post_review ? (
          <div className={styles.subcard__waiting}>
            <div>
              <p>{t(`orders_advertiser.order_status.waiting.title`)}</p>
              <SeeBtn />
            </div>
          </div>
        ) : subcard.status === orderStatus.post_review ? (
          <div className={styles.subcard__agreed}>
            <div>
              <p>{t(`orders_advertiser.order_status.agreed.title`)}</p>
              <div>
                <ChangeChannelBtn />
                <CheckBtn />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      {typeFilter !== projectTypesFilter.managerProject &&
        orderStatusChat.includes(subcard.status) && (
          <div className={styles.subcard__chat}>
            <ChannelChatBtn id={1} />
          </div>
        )}
    </div>
  );
};
