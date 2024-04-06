import { AdvProjectSubcard } from "@entities/advProjectSubcard";
import {
  CancelIcon,
  CompliteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  WaitIcon,
} from "@shared/assets";
import { ChatIcon } from "@shared/assets";
import {
  managerProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { orderStatus } from "@shared/config/orderFilter";
import { useAppSelector } from "@shared/store";
import { IChannelChat, IAdvProjectCard } from "@shared/types/common";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

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
  const { t } = useTranslation();

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);

  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.card__left}>
          <p>Кампания для Сubeinc</p>
          <span>
            <small>№{card.id}</small>
            <small>{card.date}</small>
          </span>
          <hr />
          <div>
            <p>
              {card.status === orderStatus.completed
                ? t("orders_advertiser.card.status.complited")
                : t("orders_advertiser.card.status.active")}
            </p>
          </div>
        </div>
        <div className={styles.card__right}>
          <div className={styles.card__data}>
            <div>
              <p>{t("orders_advertiser.card.channels")}:</p>
              <span>{card.channels.toLocaleString()}</span>
            </div>
            <div>
              <p>{t("orders_advertiser.card.views")}:</p>
              <span>~ {card.views.toLocaleString()}</span>
            </div>
            <div>
              <p>{t("orders_advertiser.card.cost")}:</p>
              <span>
                {card.cost.toLocaleString()} {t("symbol")}
              </span>
            </div>
          </div>
          <hr />
          <div className={styles.card__info}>
            {typeFilter === projectTypesFilter.managerProject &&
            statusFilter === managerProjectStatusFilter.agreed ? (
              <AcceptProjectBtn />
            ) : (
              <>
                <div>
                  <CompliteIcon />
                  <p>{card.complite.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card.cancel.toLocaleString()}</p>
                </div>
                <div>
                  <WaitIcon />
                  <p>{card.wait.toLocaleString()}</p>
                </div>
                <div>
                  <RocketIcon />
                  <p>{card.start.toLocaleString()}</p>
                </div>
                <div>
                  <SearchIcon />
                  <p>{card.consideration.toLocaleString()}</p>
                </div>
              </>
            )}
          </div>
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
          {card.channels_list.map((subcard, index) => (
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
              status={card.status}
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
      </button>
    </div>
  );
};
