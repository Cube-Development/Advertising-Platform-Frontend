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
import { roles } from "@entities/user";
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
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompliteIcon,
  MoreIcon,
  RocketIcon,
  SearchIcon,
  WaitIcon,
} from "@shared/assets";
import { BREAKPOINT, Languages, accordionTypes } from "@shared/config";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccountsLoader,
  MyPagination,
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

interface AdvProjectCardProps {
  card: IAdvProjectCard;
  typeFilter: projectTypesFilter;
  statusFilter: advManagerProjectStatusFilter | myProjectStatusFilter;
}

const Card: FC<AdvProjectCardProps> = ({ card, statusFilter, typeFilter }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.card} ${typeFilter === projectTypesFilter.managerProject && statusFilter !== advManagerProjectStatusFilter.completed ? styles.manager_chat : ""} ${
        typeFilter === projectTypesFilter.managerProject &&
        statusFilter === advManagerProjectStatusFilter.completed
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
            <span className={styles.tariff}>{card?.tariff_name}</span>
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
      {typeFilter === projectTypesFilter.managerProject &&
        statusFilter !== advManagerProjectStatusFilter.completed && (
          <div className={`${styles.chat__btn} display__hide__min__md`}>
            <Chat orderId={card?.id} toRole={roles.manager} />
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

          {typeFilter === projectTypesFilter.managerProject &&
            statusFilter === advManagerProjectStatusFilter.completed && (
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
          {typeFilter === projectTypesFilter.managerProject &&
          statusFilter === advManagerProjectStatusFilter.request_approve ? (
            <div
              style={
                {
                  "--columns": `${card?.is_request_approve ? 1 : 2}`,
                } as React.CSSProperties
              }
              className={styles.card__info__icons_manager_request_approve}
            >
              {card?.is_request_approve ? (
                <div>
                  <span>{t("orders_advertiser.card.request_approve")}</span>
                </div>
              ) : (
                <>
                  <div>
                    <span>
                      {t("orders_advertiser.card.not_request_approve")}
                    </span>
                  </div>
                  <AcceptProject project_id={card?.id} />
                </>
              )}
            </div>
          ) : typeFilter === projectTypesFilter.managerProject &&
            statusFilter === advManagerProjectStatusFilter.completed ? (
            <div className={styles.card__info__icons_manager_completed}>
              <div className={styles.top}>
                <div>
                  <CompliteIcon />
                  <p>{card?.completed?.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card?.canceled_rejected?.toLocaleString()}</p>
                </div>
              </div>
              <div className={styles.bottom}>
                <Feedback />
                <Feedback />
              </div>
            </div>
          ) : typeFilter === projectTypesFilter.managerProject &&
            statusFilter === advManagerProjectStatusFilter.active ? (
            <div className={styles.card__info__icons_manager_active}>
              <div>
                <RocketIcon />
                <p>{card?.in_progress?.toLocaleString()}</p>
              </div>
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
            </div>
          ) : typeFilter === projectTypesFilter.myProject &&
            statusFilter === myProjectStatusFilter.completed ? (
            <div className={styles.card__info__icons_completed}>
              <div>
                <CompliteIcon />
                <p>{card?.completed?.toLocaleString()}</p>
              </div>
              <div>
                <CancelIcon />
                <p>{card?.canceled_rejected?.toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <div className={styles.card__info__icons}>
              <div className={styles.item__full}>
                <RocketIcon />
                <p>{card?.in_progress?.toLocaleString()}</p>
              </div>
              <div className={styles.item__left}>
                <CompliteIcon />
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
        {typeFilter === projectTypesFilter.managerProject &&
          statusFilter !== advManagerProjectStatusFilter.completed && (
            <div className={`${styles.chat__btn} display__hide__max__md`}>
              <Chat orderId={card?.id} toRole={roles.manager} />
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
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const swiperRef = useRef<SwiperCore | null>(null);
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

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSlideChange = () => {
    if (swiperRef.current && (!isLoadingSelf || !isLoadingManager)) {
      const indexTo = swiperRef.current.realIndex === 0 ? 1 : 0;
      swiperRef.current.slideTo(indexTo, 500);
      handleChangeOpenSubcard();
    }
  };

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
                {(subcardsSelf?.orders || subcardsManager?.orders)?.map(
                  (subcard, index) => (
                    <AdvSubcard
                      key={index}
                      subcard={subcard}
                      FeedbackBtn={Feedback}
                      AcceptBtn={AcceptPost}
                      RejectBtn={RejectPost}
                      CheckBtn={CheckPost}
                      SeePostBtn={SeePost}
                      ChannelChatBtn={Chat}
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
        <div className="swipper__carousel">
          <Swiper
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            speed={500}
            spaceBetween={50}
            allowTouchMove={false}
          >
            <SwiperSlide className={`${styles.wrapper} border__gradient`}>
              <Card
                card={card}
                typeFilter={typeFilter}
                statusFilter={statusFilter}
              />
              <div className={styles.card__btn} onClick={handleSlideChange}>
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
                        ? "icon__white rotate side"
                        : "icon__white rotate__down side"
                    }
                  />
                )}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swipper__carousel">
                <Swiper
                  slidesPerView={1}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  // onSlideChange={handleSlideChange}
                  speed={500}
                  spaceBetween={50}
                  loop={true}
                >
                  {(subcardsSelf?.orders || subcardsManager?.orders || []).map(
                    (subcard, index) => (
                      <SwiperSlide
                        key={index}
                        className={`${styles.subcard__md} border__gradient`}
                      >
                        <div className={styles.top}>
                          <AdvSubcard
                            subcard={subcard}
                            FeedbackBtn={Feedback}
                            AcceptBtn={AcceptPost}
                            RejectBtn={RejectPost}
                            CheckBtn={CheckPost}
                            SeePostBtn={SeePost}
                            ChannelChatBtn={Chat}
                            ChangeChannelBtn={ChangeChannel}
                            typeFilter={typeFilter}
                            statusFilter={statusFilter}
                          />
                          <MyPagination
                            cardIndex={index}
                            count={
                              subcardsSelf?.orders?.length ||
                              subcardsManager?.orders?.length ||
                              1
                            }
                          />
                        </div>
                        <div
                          className={styles.card__btn}
                          onClick={handleSlideChange}
                        >
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
                                  ? "icon__white rotate side"
                                  : "icon__white rotate__down side"
                              }
                            />
                          )}
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  );
};
