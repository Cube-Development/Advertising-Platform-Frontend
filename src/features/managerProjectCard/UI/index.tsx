import { ManagerProjectSubcard } from "@entities/managerProjectSubcard";
import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  ChatIcon,
  CompliteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  SeePostIcon,
  WaitIcon,
} from "@shared/assets";
import { Languages } from "@shared/config/languages";
import { managerProjectStatusFilter } from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import {
  getProjectSubcardReq,
  useGetAdvSubprojectsMutation,
} from "@shared/store/services/advOrdersService";
import { IManagerProjectCard } from "@shared/types/managerProjects";
import { IChannelChat } from "@shared/types/common";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { orderStatus } from "@shared/config/orderFilter";

interface ManagerProjectCardProps {
  card: IManagerProjectCard;
  FeedbackBtn: FC;
  AcceptBtn: FC;
  RejectBtn: FC;
  CheckBtn: FC;
  SeeBtn: FC;
  ChannelChatBtn: FC<IChannelChat>;
  ChangeChannelBtn: FC;
  ManagerProjectRunBtn: FC;
  DownloadReportBtn: FC;
}

export const ManagerProjectCard: FC<ManagerProjectCardProps> = ({
  card,
  FeedbackBtn,
  AcceptBtn,
  ManagerProjectRunBtn,
  RejectBtn,
  CheckBtn,
  SeeBtn,
  ChannelChatBtn,
  ChangeChannelBtn,
  DownloadReportBtn,
}) => {
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const getParams: getProjectSubcardReq = {
    project_id: card.id,
    language: language?.id || Languages[0].id,
    page: 1,
  };

  // const [getAdvSubprojects, { data: subcards }] =
  //   useGetAdvSubprojectsMutation();
  const subcard = card.subcards!;

  const handleChangeOpenSubcard = (): void => {
    // if (!isSubcardOpen) {
    //   getAdvSubprojects(getParams);
    // }
    setSubcardOpen(!isSubcardOpen);
  };

  const { statusFilter } = useAppSelector((state) => state.filter);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.card} ${statusFilter === managerProjectStatusFilter.completed ? styles.grid__completed : styles.grid__active}`}
      >
        <div className={styles.card__description}>
          <div className={styles.card__description__data}>
            <div className={styles.card__description__data__title}>
              <p>
                {t("orders_advertiser.card.campaign")} {card.name}
              </p>
              <span>{card.tarif}</span>
            </div>
            <div className={styles.card__description__data__date}>
              <span>№{card.id}</span>
              <span>{card.created}</span>
            </div>
          </div>
          <div className={styles.card__description__status}>
            <p>
              {statusFilter === managerProjectStatusFilter.active
                ? t("orders_manager.card.status.active")
                : statusFilter === managerProjectStatusFilter.completed
                  ? t("orders_manager.card.status.completed")
                  : t("orders_manager.card.status.agreed")}
            </p>
          </div>
        </div>
        <div className={styles.card__info}>
          <>
            {statusFilter === managerProjectStatusFilter.completed ? (
              <div className={styles.card__info__data__completed}>
                <div className={styles.row}>
                  <div>
                    <p>{t("orders_manager.card.channels")}:</p>
                    <span>{card.count_channels.toLocaleString()}</span>
                  </div>
                  <div>
                    <p>{t("orders_manager.card.cost")}:</p>
                    <span>
                      <span>{card.budget.toLocaleString()}</span>
                      <small>{t("symbol")}</small>
                    </span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div>
                    <p>{t("orders_manager.card.views")}:</p>
                    <span>~ {card.views.toLocaleString()}</span>
                  </div>
                  <div>
                    <p>{t("orders_manager.card.rest")}:</p>
                    <span>
                      <span>{card.budget.toLocaleString()}</span>
                      <small>{t("symbol")}</small>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.card__info__data}>
                <div>
                  <p>{t("orders_manager.card.channels")}:</p>
                  <span>{card.count_channels.toLocaleString()}</span>
                </div>
                <div>
                  <p>{t("orders_manager.card.views")}:</p>
                  <span>~ {card.views.toLocaleString()}</span>
                </div>
                <div>
                  <p>{t("orders_manager.card.cost")}:</p>
                  <span>
                    <span>{card.budget.toLocaleString()}</span>
                    <small>{t("symbol")}</small>
                  </span>
                </div>
              </div>
            )}
          </>
          <>
            {statusFilter === managerProjectStatusFilter.agreed ? (
              <div
                className={
                  subcard.filter(
                    (item) => item.order_status !== orderStatus.channel_agreed,
                  ).length
                    ? "deactive"
                    : ""
                }
              >
                <ManagerProjectRunBtn />
              </div>
            ) : statusFilter === managerProjectStatusFilter.active ? (
              <div className={styles.card__info__icons}>
                <div>
                  <CompliteIcon />
                  <p>{card.completed.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card.canceled_rejected.toLocaleString()}</p>
                </div>
                <div>
                  <WaitIcon />
                  <p>{card.wait?.toLocaleString()}</p>
                </div>
                <div>
                  <RocketIcon />
                  <p>{card.in_progress?.toLocaleString()}</p>
                </div>
                <div>
                  <SearchIcon />
                  <p>{card.moderation?.toLocaleString()}</p>
                </div>
              </div>
            ) : statusFilter === managerProjectStatusFilter.completed &&
              card.report ? (
              <div className={styles.card__info__icons_completed}>
                <div>
                  <CompliteIcon />
                  <p>{card.completed.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card.canceled_rejected.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className={styles.card__info__icons_completed_report}>
                <div>
                  <CompliteIcon />
                  <p>{card.completed.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card.canceled_rejected.toLocaleString()}</p>
                </div>
                <DownloadReportBtn />
              </div>
            )}
          </>
        </div>
        <div className={styles.card__more}>
          <div className={styles.card__more__icon}>
            <button>
              <MoreIcon />
            </button>
          </div>
          <div className={styles.card__more__icon}>
            <button>
              <SeePostIcon />
            </button>
          </div>
          <div className={styles.card__more__icon}>
            <button>
              <ChatIcon />
            </button>
          </div>
        </div>
      </div>

      {isSubcardOpen && (
        <div className={styles.subcard}>
          {/* {subcards?.orders.map((subcard, index) => ( */}
          {subcard.map((subcard, index) => (
            <ManagerProjectSubcard
              key={index}
              subcard={subcard}
              FeedbackBtn={FeedbackBtn}
              AcceptBtn={AcceptBtn}
              RejectBtn={RejectBtn}
              CheckBtn={CheckBtn}
              SeePostBtn={SeeBtn}
              ChannelChatBtn={ChannelChatBtn}
              ChangeChannelBtn={ChangeChannelBtn}
            />
          ))}
        </div>
      )}

      <button
        className={`${styles.card__btn} ${isSubcardOpen ? styles.less : styles.more}`}
        onClick={() => handleChangeOpenSubcard()}
      >
        {isSubcardOpen
          ? t(`orders_manager.card.see_less`)
          : t(`orders_manager.card.see_more`)}

        <ArrowSmallVerticalIcon
          className={
            isSubcardOpen
              ? "active__icon rotate"
              : "default__icon__white rotate_down"
          }
        />
      </button>
    </div>
  );
};
