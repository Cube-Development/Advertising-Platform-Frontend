import { AdvProjectSubcard } from "@entities/advProjectSubcard";
import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompliteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  WaitIcon,
} from "@shared/assets";
import { Languages } from "@shared/config/languages";
import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import {
  getProjectSubcardReq,
  useGetAdvSubprojectsQuery,
} from "@shared/store/services/advOrdersService";
import { IAdvProjectCard } from "@shared/types/advProject";
import { IChannelChat } from "@shared/types/common";
import { IOrderFeature } from "@shared/types/order";
import { AccountsLoader } from "@shared/ui/accountsLoader";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { accordionTypes } from "@shared/config/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/shadcn-ui/ui/accordion";
import styles from "./styles.module.scss";
import { Chat } from "@widgets/header/UI/chat";

interface AdvProjectCardProps {
  card: IAdvProjectCard;
  FeedbackBtn: FC;
  AcceptBtn: FC<IOrderFeature>;
  AcceptProjectBtn: FC;
  RejectBtn: FC<IOrderFeature>;
  CheckBtn: FC<IOrderFeature>;
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
    project_id: card?.id,
    language: language?.id || Languages[0].id,
    page: 1,
  };

  const { data: subcards, isLoading } = useGetAdvSubprojectsQuery(getParams, {
    skip: !isSubcardOpen,
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

  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);

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
            statusFilter === advManagerProjectStatusFilter.agreed ? (
              <AcceptProjectBtn />
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
              />
            ))}
          </div>
        </AccordionContent>

        <AccordionTrigger onClick={() => handleChangeOpenSubcard()}>
          <div className={styles.card__btn}>
            {isLoading ? (
              <AccountsLoader />
            ) : isSubcardOpen ? (
              t(`orders_advertiser.card.see_less`)
            ) : (
              t(`orders_advertiser.card.see_more`)
            )}
            {!isLoading && (
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
