import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompliteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  WaitIcon,
} from "@shared/assets";
import {
  AccountsLoader,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Chat } from "@widgets/communication";
import {
  AcceptPost,
  ChangeChannel,
  CheckPost,
  Feedback,
  OrderChat,
  RejectPost,
  SeePost,
} from "@features/order";
import { AcceptProject } from "@features/project";
import {
  AdvSubcard,
  IAdvProjectCard,
  advManagerProjectStatusFilter,
  getProjectSubcardReq,
  myProjectStatusFilter,
  projectTypesFilter,
  useGetAdvManagerSubprojectsQuery,
  useGetAdvSubprojectsQuery,
} from "@entities/project";
import { Languages, accordionTypes } from "@shared/config";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

interface AdvProjectCardProps {
  card: IAdvProjectCard;
  typeFilter: string;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const AdvProjectCard: FC<AdvProjectCardProps> = ({
  card,
  statusFilter,
  typeFilter,
}) => {
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const getParams: getProjectSubcardReq = {
    project_id: card?.id,
    language: language?.id || Languages[0].id,
    page: 1,
  };

  const { data: subcardsSelf, isLoading: isLoadingSelf } =
    useGetAdvSubprojectsQuery(getParams, {
      skip: !isSubcardOpen || typeFilter !== projectTypesFilter.myProject,
    });

  const { data: subcardsManager, isLoading: isLoadingManager } =
    useGetAdvManagerSubprojectsQuery(getParams, {
      skip: !isSubcardOpen || typeFilter !== projectTypesFilter.managerProject,
    });

  // const subcards = card.subcard!;
  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

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
    <div
      style={
        {
          "--zIndexTop": "-3",
          "--zIndexBottom": "-4",
        } as React.CSSProperties
      }
      className={`${styles.wrapper} border__gradient`}
    >
      <div className={styles.card}>
        <div className={styles.card__description}>
          <div className={styles.card__description__data}>
            <div className={styles.card__description__data__title}>
              <p>{card.name}</p>
              <span>{card?.tarif}</span>
            </div>
            <div className={styles.card__description__data__date}>
              {/* <span>№{card?.id}</span> */}
              <span>{card?.created}</span>
            </div>
          </div>
          <div className={styles.card__description__status}>
            <p>
              {statusFilter === myProjectStatusFilter.completed
                ? t("orders_advertiser.card.status.completed")
                : t("orders_advertiser.card.status.active")}
            </p>
          </div>
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__info__data}>
            <div>
              <p>{t("orders_advertiser.card.channels")}:</p>
              <span>{card?.count_channels?.toLocaleString()}</span>
            </div>
            <div>
              <p>{t("orders_advertiser.card.views")}:</p>
              <span>~ {card?.views?.toLocaleString()}</span>
            </div>
            <div>
              <p>{t("orders_advertiser.card.cost")}:</p>
              <span>
                <span>{card?.budget?.toLocaleString()}</span>
                <small>{t("symbol")}</small>
              </span>
            </div>
          </div>
          <>
            {typeFilter === projectTypesFilter.managerProject &&
            statusFilter === advManagerProjectStatusFilter.request_approve ? (
              <AcceptProject />
            ) : typeFilter === projectTypesFilter.myProject &&
              statusFilter === myProjectStatusFilter.completed ? (
              <div className={styles.card__info__icons_completed}>
                <div>
                  <CompliteIcon />
                  <p>{card?.completed.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card?.canceled_rejected.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className={styles.card__info__icons}>
                <div>
                  <CompliteIcon />
                  <p>{card?.completed?.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card?.canceled_rejected?.toLocaleString()}</p>
                </div>
                <div>
                  <WaitIcon />
                  <p>{card?.wait?.toLocaleString()}</p>
                </div>
                <div>
                  <RocketIcon />
                  <p>{card?.in_progress?.toLocaleString()}</p>
                </div>
                <div>
                  <SearchIcon />
                  <p>{card?.moderation?.toLocaleString()}</p>
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
              <Chat />
            </div>
          )}
        </div>
      </div>
      <AccordionItem
        style={
          {
            "--zIndexTop": "-1",
            "--zIndexBottom": "-2",
            "--borderMass": "2px",
          } as React.CSSProperties
        }
        className="border__gradient"
        value={`item-${card.id}`}
        ref={accordionRef}
      >
        <AccordionContent>
          <div className={`${styles.subcard} `}>
            {(subcardsSelf?.orders || subcardsManager?.orders)?.map(
              (subcard, index) => (
                <AdvSubcard
                  key={index}
                  subcard={subcard}
                  FeedbackBtn={Feedback}
                  AcceptBtn={AcceptPost}
                  RejectBtn={RejectPost}
                  CheckBtn={CheckPost}
                  SeeBtn={SeePost}
                  ChannelChatBtn={OrderChat}
                  ChangeChannelBtn={ChangeChannel}
                  typeFilter={typeFilter}
                  statusFilter={statusFilter}
                />
              ),
            )}
          </div>
        </AccordionContent>
        <AccordionTrigger onClick={() => handleChangeOpenSubcard()}>
          <div className={styles.card__btn}>
            {isLoadingSelf || isLoadingManager ? (
              <AccountsLoader />
            ) : isSubcardOpen ? (
              t(`orders_advertiser.card.see_less`)
            ) : (
              t(`orders_advertiser.card.see_more`)
            )}
            {(!isLoadingSelf || !isLoadingManager) && (
              <ArrowSmallVerticalIcon
                className={
                  isSubcardOpen
                    ? "default__icon__white rotate"
                    : "default__icon__white rotate__down"
                }
              />
            )}
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </div>
  );
};
