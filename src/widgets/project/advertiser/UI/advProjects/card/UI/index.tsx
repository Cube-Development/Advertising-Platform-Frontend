import {
  AdvSubcard,
  IAdvProjectCard,
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  getProjectSubcardReq,
  ENUM_ADV_MY_PROJECT_STATUS,
  projectStatus,
  ENUM_PROJECT_TYPES,
  useGetAdvManagerSubprojectsQuery,
  useGetAdvSubprojectsQuery,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import {
  AcceptPost,
  ChangeChannel,
  CheckPost,
  Feedback,
  RejectPost,
  ReplaceChannel,
  ReplacePost,
  SeePost,
} from "@features/order";
import { AcceptProject, DownloadReport } from "@features/project";
import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompleteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  WaitIcon,
} from "@shared/assets";
import { BREAKPOINT, ENUM_ACCORDION_TYPES } from "@shared/config";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccountsLoader,
  MyPagination,
  SpinnerLoader,
} from "@shared/ui";
import { Chat } from "@widgets/communication";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";

interface AdvProjectCardProps {
  card: IAdvProjectCard;
  typeFilter: ENUM_PROJECT_TYPES;
  statusFilter: ENUM_ADV_MANAGER_PROJECT_STATUS | ENUM_ADV_MY_PROJECT_STATUS;
}

const Card: FC<AdvProjectCardProps> = ({ card, statusFilter, typeFilter }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.card} ${
        typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT
          ? //  && statusFilter !== advManagerProjectStatusFilter.completed
            styles.manager_chat
          : ""
      } ${
        typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
        statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED
          ? styles.card__manager_completed
          : ""
      }`}
    >
      <div className={styles.card__description}>
        <div className={styles.card__description__data}>
          <div className={styles.card__description__data__title}>
            <p className="truncate">{card?.project_name}</p>
            <span>№{card?.identifier}</span>
          </div>
          <div className={styles.card__description__data__date}>
            <span className="gradient_color">{card?.tariff_name}</span>
            <span>{card?.created}</span>
          </div>
        </div>
        <div className={styles.card__description__status}>
          <p>
            {statusFilter === ENUM_ADV_MY_PROJECT_STATUS.COMPLETED
              ? t("orders_advertiser.card.status.completed")
              : t("orders_advertiser.card.status.active")}
          </p>
        </div>
      </div>
      {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT && (
        // statusFilter !== advManagerProjectStatusFilter.completed &&
        <div className={`${styles.chat__btn} display__hide__min__md`}>
          <Chat projectId={card?.id} toRole={ENUM_ROLES.MANAGER} />
        </div>
      )}
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

          {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED && (
              <div>
                <p>{t("orders_advertiser.card.remainder")}:</p>
                <span>
                  <span>{card?.remainder?.toLocaleString()}</span>
                  <small>{t("symbol")}</small>
                </span>
              </div>
            )}
        </div>
        <>
          {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
          statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.REQUEST_APPROVE ? (
            <div className={styles.card__info__icons_manager_request_approve}>
              {card?.is_request_approve === projectStatus.approved ? (
                <div>
                  <span>{t("orders_advertiser.card.request_approve")}</span>
                </div>
              ) : card?.is_request_approve === projectStatus.request_approve ||
                card?.is_request_approve === projectStatus.changed ? (
                <>
                  <div>
                    <span>
                      {t("orders_advertiser.card.not_request_approve")}
                    </span>
                  </div>
                  <AcceptProject
                    project_id={card?.id}
                    status={card?.is_request_approve!}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          ) : typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED ? (
            <div className={styles.card__info__icons_manager_completed}>
              <div className={styles.top}>
                <div>
                  <CompleteIcon />
                  <p>{card?.completed?.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card?.canceled?.toLocaleString()}</p>
                </div>
              </div>
              <div className={styles.bottom}>
                <Feedback />
                <DownloadReport project_id={card?.id} />
              </div>
            </div>
          ) : typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE ? (
            <div className={styles.card__info__icons_manager_active}>
              <div>
                <RocketIcon />
                <p>{card?.in_progress?.toLocaleString()}</p>
              </div>
              <div>
                <CompleteIcon />
                <p>{card?.completed?.toLocaleString()}</p>
              </div>
              <div>
                <CancelIcon />
                <p>{card?.canceled?.toLocaleString()}</p>
              </div>
              <div>
                <WaitIcon />
                <p>{card?.wait?.toLocaleString()}</p>
              </div>
            </div>
          ) : typeFilter === ENUM_PROJECT_TYPES.MY_PROJECT &&
            statusFilter === ENUM_ADV_MY_PROJECT_STATUS.COMPLETED ? (
            <div className={styles.card__info__icons_completed}>
              <div className={styles.icons}>
                <div className={styles.icon}>
                  <CompleteIcon />
                  <p>{card?.completed?.toLocaleString()}</p>
                </div>
                <div className={styles.icon}>
                  <CancelIcon />
                  <p>{card?.canceled_rejected?.toLocaleString()}</p>
                </div>
              </div>
              <DownloadReport project_id={card?.id} />
            </div>
          ) : (
            <div className={styles.card__info__icons}>
              <div className={styles.item__full}>
                <RocketIcon />
                <p>{card?.in_progress?.toLocaleString()}</p>
              </div>
              <div className={styles.item__left}>
                <CompleteIcon />
                <p>{card?.completed?.toLocaleString()}</p>
              </div>
              <div className={styles.item__right}>
                <CancelIcon />
                <p>{card?.canceled_rejected?.toLocaleString()}</p>
              </div>
              <div className={styles.item__left}>
                <WaitIcon />
                <p>{card?.wait?.toLocaleString()}</p>
              </div>
              <div className={styles.item__right}>
                <SearchIcon />
                <p>{card?.moderation?.toLocaleString()}</p>
              </div>
            </div>
          )}
        </>
      </div>
      <div className={styles.card__more}>
        <div className={styles.more__btn}>
          <button>
            <MoreIcon />
          </button>
        </div>
        {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT && (
          // statusFilter !== advManagerProjectStatusFilter.completed &&
          <div className={`${styles.chat__btn} display__hide__max__md`}>
            <Chat projectId={card?.id} toRole={ENUM_ROLES.MANAGER} />
          </div>
        )}
      </div>
    </div>
  );
};

export const AdvProjectCard: FC<AdvProjectCardProps> = ({
  card,
  statusFilter,
  typeFilter,
}) => {
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const screen = useWindowWidth();
  const swiperRef = useRef<SwiperCore | null>(null);
  const { t } = useTranslation();
  const language = useFindLanguage();
  const getParams: getProjectSubcardReq = {
    project_id: card?.id,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
  };

  const { data: subcardsAdv, isLoading: isLoadingAdv } =
    useGetAdvSubprojectsQuery(getParams, {
      skip: !isSubcardOpen || typeFilter !== ENUM_PROJECT_TYPES.MY_PROJECT,
    });

  const { data: subcardsManager, isLoading: isLoadingManager } =
    useGetAdvManagerSubprojectsQuery(getParams, {
      skip: !isSubcardOpen || typeFilter !== ENUM_PROJECT_TYPES.MANAGER_PROJECT,
    });

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  const accordionRef = useRef(null);

  const handleClickOutside = () => {
    if (accordionRef.current) {
      const state = (accordionRef.current as HTMLElement).getAttribute(
        "data-state",
      );
      state === ENUM_ACCORDION_TYPES.OPEN
        ? setSubcardOpen(true)
        : setSubcardOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeFilter && statusFilter && swiperRef.current) {
      swiperRef.current.slideTo(0, 500);
      setSubcardOpen(false);
    }
  }, [typeFilter, statusFilter]);

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div
          style={
            {
              "--zIndexTop": "-3",
              "--zIndexBottom": "-4",
            } as React.CSSProperties
          }
          className={`${styles.wrapper} border__gradient `}
        >
          <Card
            card={card}
            typeFilter={typeFilter}
            statusFilter={statusFilter}
          />
          <AccordionItem
            style={
              {
                "--zIndexTop": "-1",
                "--zIndexBottom": "-2",
                "--borderMass": "2px",
              } as React.CSSProperties
            }
            // className="border__gradient"
            value={`item-${card?.id}`}
            ref={accordionRef}
            className="border-none"
          >
            <AccordionContent>
              <div className={`${styles.subcard} `}>
                {(subcardsAdv?.orders || subcardsManager?.orders)?.map(
                  (subcard, index) => (
                    <AdvSubcard
                      key={index}
                      card={card}
                      subcard={subcard}
                      FeedbackBtn={Feedback}
                      AcceptBtn={AcceptPost}
                      RejectBtn={RejectPost}
                      CheckBtn={CheckPost}
                      SeePostBtn={SeePost}
                      ChannelChatBtn={Chat}
                      // ChangeChannelBtn={ChangeChannel}
                      ReplaceChannelBtn={ReplaceChannel}
                      ReplacePostBtn={ReplacePost}
                      typeFilter={typeFilter}
                      statusFilter={statusFilter}
                    />
                  ),
                )}
              </div>
            </AccordionContent>
            <AccordionTrigger onClick={() => handleChangeOpenSubcard()}>
              <div className={styles.card__btn}>
                {isSubcardOpen
                  ? t(`orders_advertiser.card.see_less`)
                  : t(`orders_advertiser.card.see_more`)}
                {isLoadingAdv || isLoadingManager ? (
                  <div className="loader">
                    <AccountsLoader />
                  </div>
                ) : (
                  <ArrowSmallVerticalIcon
                    className={
                      isSubcardOpen
                        ? "icon__white rotate"
                        : "icon__white rotate__down"
                    }
                  />
                )}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </div>
      ) : (
        <>
          <div
            className={`${styles.disable_radius} overflow-hidden relative border__gradient`}
          >
            <div
              className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
                isSubcardOpen ? "-translate-x-full" : "translate-x-0"
              } ${styles.wrapper} ${typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT && statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED ? styles.completed : ""}`}
            >
              <Card
                card={card}
                typeFilter={typeFilter}
                statusFilter={statusFilter}
              />
            </div>
            <div
              className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
                isSubcardOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {(isLoadingAdv || isLoadingManager) && (
                <div className="grid justify-center items-center h-full pt-[100px]">
                  <SpinnerLoader />
                </div>
              )}
              <div className={`swipper__carousel`}>
                <Swiper
                  slidesPerView={1}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  speed={500}
                  spaceBetween={50}
                  loop={true}
                >
                  {(subcardsAdv?.orders || subcardsManager?.orders || []).map(
                    (subcard, index) => (
                      <SwiperSlide
                        key={index}
                        className={`${styles.subcard__md}`}
                      >
                        <div className={styles.top}>
                          <AdvSubcard
                            card={card}
                            subcard={subcard}
                            FeedbackBtn={Feedback}
                            AcceptBtn={AcceptPost}
                            RejectBtn={RejectPost}
                            CheckBtn={CheckPost}
                            SeePostBtn={SeePost}
                            ChannelChatBtn={Chat}
                            // ChangeChannelBtn={ChangeChannel}
                            ReplaceChannelBtn={ReplaceChannel}
                            ReplacePostBtn={ReplacePost}
                            typeFilter={typeFilter}
                            statusFilter={statusFilter}
                          />
                          <MyPagination
                            cardIndex={index}
                            count={
                              subcardsAdv?.orders?.length ||
                              subcardsManager?.orders?.length ||
                              1
                            }
                          />
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
            </div>
          </div>
          <div
            className={styles.card__btn}
            onClick={() => setSubcardOpen((prev) => !prev)}
          >
            {isLoadingAdv || isLoadingManager ? (
              <div className="loader">
                <AccountsLoader />
              </div>
            ) : (
              <ArrowSmallVerticalIcon
                className={
                  isSubcardOpen
                    ? "icon__white rotate side"
                    : "icon__white rotate__down side"
                }
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
