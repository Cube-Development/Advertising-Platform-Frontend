import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompliteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  SeePostIcon,
  WaitIcon,
} from "@shared/assets";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Chat } from "@widgets/communication";
import {
  DownloadReport,
  RejectPost,
  RunProject,
  SeePost,
} from "@features/project";
import {
  AcceptOrder,
  ChangeChannel,
  CheckPost,
  Feedback,
  OrderChat,
} from "@features/order";
import { ManagerSubcard, orderStatus } from "@entities/order";
import {
  IManagerProjectCard,
  getProjectSubcardReq,
  managerProjectStatusFilter,
} from "@entities/project";
import { Languages, accordionTypes } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@shared/ui";

interface ManagerProjectCardProps {
  card: IManagerProjectCard;
}

export const ManagerProjectCard: FC<ManagerProjectCardProps> = ({ card }) => {
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

  // const { data: subcards } = useGetAdvSubprojectsQuery(getParams, {
  //   skip: !isSubcardOpen,
  // });
  const subcard = card.subcards!;

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  const { statusFilter } = useAppSelector((state) => state.filter);

  const accordionRef = useRef(null);

  const handleClickOutside = () => {
    const state = (accordionRef.current! as HTMLElement).getAttribute(
      "data-state",
    );
    state === accordionTypes.open
      ? setSubcardOpen(true)
      : setSubcardOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.wrapper} border__gradient`}>
      <div
        className={`${styles.card} ${statusFilter === managerProjectStatusFilter.completed ? styles.grid__completed : styles.grid__active}`}
      >
        <div className={styles.card__description}>
          <div className={styles.card__description__data}>
            <div className={styles.card__description__data__title}>
              <p>{card.name}</p>
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
                    (item) => item?.api_status !== orderStatus.channel_agreed,
                  ).length
                    ? "deactive"
                    : ""
                }
              >
                <RunProject />
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
                <DownloadReport />
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
            <Chat />
          </div>
        </div>
      </div>

      <AccordionItem value={`item-${card.id}`} ref={accordionRef}>
        <AccordionContent>
          <div className={styles.subcard}>
            {subcard.map((subcard, index) => (
              <ManagerSubcard
                key={index}
                subcard={subcard}
                FeedbackBtn={Feedback}
                AcceptBtn={AcceptOrder}
                RejectBtn={RejectPost}
                CheckBtn={CheckPost}
                SeePostBtn={SeePost}
                ChannelChatBtn={OrderChat}
                ChangeChannelBtn={ChangeChannel}
              />
            ))}
          </div>
        </AccordionContent>

        <AccordionTrigger onClick={() => handleChangeOpenSubcard()}>
          <div
            className={styles.card__btn}
            onClick={() => handleChangeOpenSubcard()}
          >
            {isSubcardOpen
              ? t(`orders_manager.card.see_less`)
              : t(`orders_manager.card.see_more`)}

            <ArrowSmallVerticalIcon
              className={
                isSubcardOpen
                  ? "default__icon__white rotate"
                  : "default__icon__white rotate__down"
              }
            />
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </div>
  );
};