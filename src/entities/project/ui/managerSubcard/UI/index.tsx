import { channelStatusFilter } from "@entities/channel";
import { IChatOpen } from "@entities/communication";
import { offerStatusFilter } from "@entities/offer";
import {
  desireStatus,
  IManagerProjectSubcard,
  IOrderFeature,
  managerProjectStatusFilter,
  orderStatus,
  orderStatusChat,
} from "@entities/project";
import {
  EyeIcon,
  ManIcon,
  RatingIcon,
  SubsIcon,
  WomanIcon,
} from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ManagerProjectSubcardProps {
  subcard: IManagerProjectSubcard;
  FeedbackBtn: FC;
  AcceptBtn: FC<IOrderFeature>;
  RejectBtn: FC<IOrderFeature>;
  CheckBtn: FC;
  SeePostBtn: FC;
  project_id: string;
  ChangeChannelBtn: FC<{ project_id: string }>;
  ChangePostBtn: FC<{ project_id: string }>;
  SeeCommentBtn: FC;
  ChannelChatBtn: FC<IChatOpen>;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ManagerProjectSubcard: FC<ManagerProjectSubcardProps> = ({
  subcard,
  FeedbackBtn,
  AcceptBtn,
  RejectBtn,
  CheckBtn,
  SeePostBtn,
  ChannelChatBtn,
  ChangeChannelBtn,
  ChangePostBtn,
  SeeCommentBtn,
  project_id,
  statusFilter,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${styles.subcard} ${statusFilter === managerProjectStatusFilter.active ? styles.grid__active : styles.grid}`}
    >
      <div className={styles.subcard__left}>
        <div className={styles.subcard__left__description}>
          <div className={styles.subcard__left__description__logo}>
            <img src={subcard?.avatar} alt="" />
          </div>
          <div className={styles.subcard__left__description__rate}>
            <RatingIcon />
          </div>
          <div className={styles.subcard__left__description__title}>
            <p>{subcard?.name}</p>
            <span>{subcard?.category}</span>
          </div>
        </div>
        <div className={styles.subcard__left__info}>
          <div className={styles.subcard__left__info__top}>
            <p>{t(`orders_manager.subcard.date`)}</p>
            <span>
              {typeof subcard?.publish_date === "object"
                ? subcard?.publish_date?.date_from +
                  " - " +
                  subcard?.publish_date?.date_to
                : subcard?.publish_date}
            </span>
          </div>
          <div>
            <p>{t(`orders_manager.subcard.accommodation`)}</p>
            <span>{subcard?.format?.small}</span>
          </div>
        </div>
        <div className={styles.subcard__left__info}>
          <div className={styles.subcard__left__info__top}>
            <p>{t(`orders_manager.subcard.time`)}</p>
            <span>
              {subcard?.publish_time?.time_from} -{" "}
              {subcard?.publish_time?.time_to}
            </span>
          </div>
          <div>
            <p>{t(`orders_manager.subcard.price`)}</p>
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
              <span>{subcard?.subscribers?.toLocaleString()}</span>
            </div>
            <div className={styles.info}>
              <div>
                <EyeIcon />
              </div>
              <span>{subcard?.views?.toLocaleString()}</span>
            </div>
          </div>
          <div className={styles.subcard__left__data__middle}>
            <div>
              <ManIcon />
            </div>
            <div
              className="colorline"
              style={{ "--male": `${subcard?.male}%` } as React.CSSProperties}
              data-male={`${subcard?.male}%`}
              data-female={`${subcard?.female}%`}
            />
            <div>
              <WomanIcon />
            </div>
          </div>
          <div className={styles.subcard__left__data__row}>
            <div className={styles.info}>
              <p>ER:</p>
              <span>{subcard?.er}%</span>
            </div>
            <div className={styles.info}>
              <p>CPV:</p>
              <span>
                {subcard?.cpv?.toLocaleString()} {t(`symbol`)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <>
        {subcard?.desire?.length === 0 ? (
          <div className={styles.subcard__agreed}>
            <div>
              <p>{t(`orders_manager.order_status.agreed.title`)}</p>
              <div>
                <ChangePostBtn project_id={project_id} />
                <CheckBtn />
              </div>
            </div>
          </div>
        ) : subcard?.desire?.length ? (
          <div className={styles.subcard__posted}>
            <div className={styles.subcard__posted__title}>
              <p>{t(`orders_manager.order_status.comment.title`)}</p>
            </div>
            <div className={styles.subcard__posted__buttons}>
              <div className={styles.subcard__posted__buttons__top}>
                {subcard?.desire.length === 2 ? (
                  <>
                    <ChangePostBtn project_id={project_id} />
                    <ChangeChannelBtn project_id={project_id} />
                  </>
                ) : subcard?.desire[0].desire_type ===
                  desireStatus.replace_channel_request ? (
                  <ChangeChannelBtn project_id={project_id} />
                ) : (
                  <ChangePostBtn project_id={project_id} />
                )}
              </div>
              <SeeCommentBtn />
            </div>
          </div>
        ) : subcard?.api_status === orderStatus.canceled ||
          subcard?.api_status === orderStatus.rejected ? (
          <div className={styles.subcard__cancel}>
            {statusFilter === managerProjectStatusFilter.completed ? (
              <p>{t(`orders_manager.order_status.rejected.title2`)}</p>
            ) : (
              <>
                <p>{t(`orders_manager.order_status.rejected.title`)}</p>
                <span>{t(`orders_manager.order_status.rejected.text`)}</span>
              </>
            )}
          </div>
        ) : subcard?.api_status === orderStatus.completed ? (
          <div className={styles.subcard__completed}>
            {statusFilter === managerProjectStatusFilter.completed ? (
              <p>{t(`orders_manager.order_status.completed.title2`)}</p>
            ) : (
              <>
                <p>{t(`orders_manager.order_status.completed.title`)}</p>
                <FeedbackBtn />
              </>
            )}
          </div>
        ) : subcard?.api_status === orderStatus.post_review ? (
          <div className={styles.subcard__posted}>
            <div className={styles.subcard__posted__title}>
              <p>{t(`orders_manager.order_status.posted.title`)}</p>
              <span>{t(`orders_manager.order_status.posted.text`)}</span>
            </div>
            <div className={styles.subcard__posted__buttons}>
              <div className={styles.subcard__posted__buttons__top}>
                <AcceptBtn order_id={subcard.id} />
                <RejectBtn order_id={subcard.id} />
              </div>
              <CheckBtn />
            </div>
          </div>
        ) : subcard?.api_status === orderStatus.in_progress ? (
          <div className={styles.subcard__accepted}>
            <p>{t(`orders_manager.order_status.accepted.title`)}</p>
            <span>{t(`orders_manager.order_status.accepted.text`)}</span>
            <SeePostBtn />
          </div>
        ) : subcard?.api_status === orderStatus.moderation ? (
          <div className={styles.subcard__moderation}>
            <div>
              <p>{t(`orders_manager.order_status.moderation.title`)}</p>
              <span>
                {t(`orders_manager.order_status.moderation.text`)}
                <small>
                  {t(`orders_manager.order_status.moderation.small`)}
                </small>
              </span>
            </div>
          </div>
        ) : subcard?.api_status === orderStatus.wait ? (
          <div className={styles.subcard__waiting}>
            <div>
              <p>{t(`orders_manager.order_status.waiting.title`)}</p>
              <SeePostBtn />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      {statusFilter === managerProjectStatusFilter.active && (
        <div
          className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
        >
          <ChannelChatBtn orderId={"1"} />
        </div>
      )}
    </div>
  );
};
