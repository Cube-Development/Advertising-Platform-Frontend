import { AdvProjectSubcard } from "@entities/advProjectSubcard";
import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  ChatIcon,
  CompliteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  WaitIcon,
} from "@shared/assets";
import {
  managerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import { IChannelChat } from "@shared/types/common";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IAdvProjectCard } from "@shared/types/advProject";
import {
  getProjectSubcardReq,
  useGetAdvSubprojectsMutation,
} from "@shared/store/services/advProjectsService";
import { Languages } from "@shared/config/languages";

interface AdvProjectCardProps {
  card: IAdvProjectCard;
  FeedbackBtn: FC;
  AcceptBtn: FC;
  AcceptProjectBtn: FC;
  RejectBtn: FC;
  CheckBtn: FC;
  SeeBtn: FC;
  ChannelChatBtn: FC<IChannelChat>;
  ChangeChannelBtn: FC;
}

export const AdvProjectCard: FC<AdvProjectCardProps> = ({
  card,
  FeedbackBtn,
  AcceptBtn,
  AcceptProjectBtn,
  RejectBtn,
  CheckBtn,
  SeeBtn,
  ChannelChatBtn,
  ChangeChannelBtn,
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

  const [getAdvSubprojects, { data: subcards }] =
    useGetAdvSubprojectsMutation();

  const handleChangeOpenSubcard = (): void => {
    if (!isSubcardOpen) {
      getAdvSubprojects(getParams);
    }
    setSubcardOpen(!isSubcardOpen);
  };

  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.card__description}>
          <div className={styles.card__description__data}>
            <div className={styles.card__description__data__title}>
              <p>Кампания для Сubeinc</p>
              <span>НАчальный</span>
            </div>
            <div className={styles.card__description__data__date}>
              {/* <span>№{card.id}</span> */}
              <span>{card.created}</span>
            </div>
          </div>
          <div className={styles.card__description__status}>
            <p>
              {statusFilter === myProjectStatusFilter.completed
                ? t("orders_advertiser.card.status.complited")
                : t("orders_advertiser.card.status.active")}
            </p>
          </div>
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__info__data}>
            <div>
              <p>{t("orders_advertiser.card.channels")}:</p>
              <span>{card.count_channels.toLocaleString()}</span>
            </div>
            <div>
              <p>{t("orders_advertiser.card.views")}:</p>
              <span>~ {card.views.toLocaleString()}</span>
            </div>
            <div>
              <p>{t("orders_advertiser.card.cost")}:</p>
              <span>
                <span>{card.budget.toLocaleString()}</span>
                <small>{t("symbol")}</small>
              </span>
            </div>
          </div>
          <>
            {typeFilter === projectTypesFilter.managerProject &&
            statusFilter === managerProjectStatusFilter.agreed ? (
              <AcceptProjectBtn />
            ) : (
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
            )}
          </>
        </div>
        <div className={styles.card__more}>
          <div>
            <button>
              <MoreIcon />
            </button>
          </div>
          {typeFilter === projectTypesFilter.managerProject && (
            <div className={styles.chat__btn}>
              <button>
                <ChatIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {isSubcardOpen && (
        <div className={styles.subcard}>
          {subcards?.orders.map((subcard, index) => (
            <AdvProjectSubcard
              key={index}
              subcard={subcard}
              FeedbackBtn={FeedbackBtn}
              AcceptBtn={AcceptBtn}
              RejectBtn={RejectBtn}
              CheckBtn={CheckBtn}
              SeeBtn={SeeBtn}
              ChannelChatBtn={ChannelChatBtn}
              ChangeChannelBtn={ChangeChannelBtn}
              typeFilter={typeFilter}
            />
          ))}
        </div>
      )}

      <button
        className={`${styles.card__btn} ${isSubcardOpen ? styles.less : styles.more}`}
        onClick={() => handleChangeOpenSubcard()}
      >
        {isSubcardOpen
          ? t(`orders_advertiser.card.see_less`)
          : t(`orders_advertiser.card.see_more`)}

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
