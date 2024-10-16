import {
  IManagerProjectCard,
  ManagerProjectSubcard,
  getProjectSubcardReq,
  managerProjectStatusFilter,
  useGetManagerSubprojectsQuery,
} from "@entities/project";
import { roles } from "@entities/user";
import {
  AcceptPost,
  ChangeChannel,
  ChangePost,
  CheckPost,
  Feedback,
  RejectPost,
  SeeComment,
  SeePost,
} from "@features/order";
import {
  DownloadReport,
  LaunchProject,
  SendToBot,
  TechnicalSpecification,
} from "@features/project";
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

interface ManagerProjectCardProps {
  card: IManagerProjectCard;
  statusFilter: managerProjectStatusFilter;
}

const Card: FC<ManagerProjectCardProps> = ({ card, statusFilter }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.card} ${statusFilter === managerProjectStatusFilter.request_approve ? styles.request_approve : ""} ${statusFilter === managerProjectStatusFilter.completed ? styles.card__manager_completed : ""}`}
    >
      <div className={styles.card__description}>
        <div className={styles.card__description__data}>
          <div className={styles.card__description__data__title}>
            <p className="truncate">{card?.project_name}</p>
            <span>№{card?.identifier}</span>
          </div>
          <div className={styles.card__description__data__date}>
            <span className={styles.tariff_name}>{card?.tariff_name}</span>
            <span>{card?.tariff_date}</span>
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
      {
        <div className={`${styles.buttons__md} display__hide__min__md`}>
          <div className={styles.chat__btn}>
            <Chat orderId={card.id} toRole={roles.advertiser} />
          </div>
          <div className={styles.ts__btn}>
            <TechnicalSpecification card={card} SendToBotBtn={SendToBot} />
          </div>
        </div>
      }
      <div className={styles.card__info}>
        <div className={styles.card__info__data}>
          <div>
            <p>{t("orders_manager.card.channels")}:</p>
            <span>{card?.orders?.toLocaleString()}</span>
          </div>
          <div>
            <p>{t("orders_manager.card.views")}:</p>
            <span>~ {card?.views?.toLocaleString()}</span>
          </div>
          <div>
            <p>{t("orders_manager.card.budget")}:</p>
            <span>
              <span>{card?.budget?.toLocaleString()}</span>
              <small>{t("symbol")}</small>
            </span>
          </div>

          {statusFilter === managerProjectStatusFilter.completed && (
            <div>
              <p>{t("orders_manager.card.rest")}:</p>
              <span>
                <span>{card?.remainder?.toLocaleString()}</span>
                <small>{t("symbol")}</small>
              </span>
            </div>
          )}
        </div>
        <>
          {statusFilter === managerProjectStatusFilter.request_approve ? (
            <div className={styles.card__info__icons_manager_request_approve}>
              <div>
                <span>
                  {Boolean(card?.is_request_approve)
                    ? t("orders_manager.card.request_approve")
                    : t("orders_manager.card.not_request_approve")}
                </span>
              </div>
              <LaunchProject
                is_request_approve={card?.is_request_approve || false}
                project_id={card?.project_id}
              />
            </div>
          ) : statusFilter === managerProjectStatusFilter.completed ? (
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
                <DownloadReport />
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

      <div className={styles.card__features}>
        <div className={styles.card__features__more}>
          <button>
            <MoreIcon />
          </button>
        </div>
        <div className={`${styles.card__features__ts} display__hide__max__md`}>
          <TechnicalSpecification card={card} SendToBotBtn={SendToBot} />
        </div>
        <div
          className={`${styles.card__features__chat} display__hide__max__md`}
        >
          <Chat orderId={card.id} toRole={roles.advertiser} isProject={true} />
        </div>
      </div>
    </div>
  );
};

export const ManagerProjectCard: FC<ManagerProjectCardProps> = ({
  card,
  statusFilter,
}) => {
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const swiperRef = useRef<SwiperCore | null>(null);

  const getParams: getProjectSubcardReq = {
    project_id: card.project_id,
    language: language?.id || Languages[0].id,
    page: 1,
  };

  const { data: subcards, isLoading } = useGetManagerSubprojectsQuery(
    getParams,
    { skip: !isSubcardOpen },
  );

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

  // const handleSlideChange = () => {
  //   if (swiperRef.current && !isLoading) {
  //     const indexTo = swiperRef.current.realIndex === 0 ? 1 : 0;
  //     swiperRef.current.slideTo(indexTo, 500);
  //     handleChangeOpenSubcard();
  //   }
  // };

  useEffect(() => {
    if (statusFilter && swiperRef.current) {
      swiperRef.current.slideTo(0, 500);
      setSubcardOpen(false);
    }
  }, [statusFilter]);

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
          <Card card={card} statusFilter={statusFilter} />
          <AccordionItem
            style={
              {
                "--zIndexTop": "-1",
                "--zIndexBottom": "-2",
                "--borderMass": "2px",
              } as React.CSSProperties
            }
            // className="border__gradient"
            value={`item-${card.id}`}
            ref={accordionRef}
            className="border-none"
          >
            <AccordionContent>
              <div className={`${styles.subcard} `}>
                {subcards?.orders?.map((subcard, index) => (
                  <ManagerProjectSubcard
                    key={index}
                    project_id={card.project_id}
                    subcard={subcard}
                    FeedbackBtn={Feedback}
                    AcceptBtn={AcceptPost}
                    RejectBtn={RejectPost}
                    CheckBtn={CheckPost}
                    SeePostBtn={SeePost}
                    ChannelChatBtn={Chat}
                    ChangeChannelBtn={ChangeChannel}
                    ChangePostBtn={ChangePost}
                    SeeCommentBtn={SeeComment}
                    statusFilter={statusFilter}
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
          {/* abdsh */}
          <div
            className={`${styles.disable_radius} overflow-hidden relative h-[500px] border__gradient`}
          >
            <div
              className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
                isSubcardOpen ? "-translate-x-full" : "translate-x-0"
              } ${styles.wrapper}`}
            >
              <Card card={card} statusFilter={statusFilter} />
            </div>
            <div
              className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
                isSubcardOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {isLoading && (
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
                  {subcards?.orders.map((subcard, index) => (
                    <SwiperSlide
                      key={index}
                      className={`${styles.subcard__md}`}
                    >
                      <div className={styles.top}>
                        <ManagerProjectSubcard
                          key={index}
                          project_id={card.project_id}
                          subcard={subcard}
                          FeedbackBtn={Feedback}
                          AcceptBtn={AcceptPost}
                          RejectBtn={RejectPost}
                          CheckBtn={CheckPost}
                          SeePostBtn={SeePost}
                          ChannelChatBtn={Chat}
                          ChangeChannelBtn={ChangeChannel}
                          ChangePostBtn={ChangePost}
                          SeeCommentBtn={SeeComment}
                          statusFilter={statusFilter}
                        />
                        <MyPagination
                          cardIndex={index}
                          count={subcards?.orders?.length || 1}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div
            className={styles.card__btn}
            onClick={() => setSubcardOpen((prev) => !prev)}
          >
            {isLoading && (
              <div className="grid justify-center items-center h-full pt-[100px]">
                <SpinnerLoader />
              </div>
            )}
            {isLoading && (
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
        // <div className="swipper__carousel">
        //   <Swiper
        //     slidesPerView={1}
        //     onSwiper={(swiper) => (swiperRef.current = swiper)}
        //     speed={500}
        //     spaceBetween={50}
        //     allowTouchMove={false}
        //   >
        //     <SwiperSlide className={`${styles.wrapper} border__gradient`}>
        //       <Card card={card} statusFilter={statusFilter} />
        //       <div className={styles.card__btn} onClick={handleSlideChange}>
        //         {isLoading ? (
        //           <AccountsLoader />
        //         ) : isSubcardOpen ? (
        //           t(`orders_advertiser.card.see_less`)
        //         ) : (
        //           t(`orders_advertiser.card.see_more`)
        //         )}
        //         {!isLoading && (
        //           <ArrowSmallVerticalIcon
        //             className={
        //               isSubcardOpen
        //                 ? "icon__white rotate side"
        //                 : "icon__white rotate__down side"
        //             }
        //           />
        //         )}
        //       </div>
        //     </SwiperSlide>
        //     {isLoading && (
        //       <div className="grid justify-center items-center h-full pt-[100px]">
        //         <SpinnerLoader />
        //       </div>
        //     )}
        //     <SwiperSlide>
        //       <div className="swipper__carousel">
        //         <Swiper
        //           slidesPerView={1}
        //           onSwiper={(swiper) => (swiperRef.current = swiper)}
        //           // onSlideChange={handleSlideChange}
        //           speed={500}
        //           spaceBetween={50}
        //           loop={true}
        //         >
        //           {subcards?.orders.map((subcard, index) => (
        //             <SwiperSlide
        //               key={index}
        //               className={`${styles.subcard__md} border__gradient`}
        //             >
        // <div className={styles.top}>
        //   <ManagerProjectSubcard
        //     key={index}
        //     project_id={card.project_id}
        //     subcard={subcard}
        //     FeedbackBtn={Feedback}
        //     AcceptBtn={AcceptPost}
        //     RejectBtn={RejectPost}
        //     CheckBtn={CheckPost}
        //     SeePostBtn={SeePost}
        //     ChannelChatBtn={Chat}
        //     ChangeChannelBtn={ChangeChannel}
        //     ChangePostBtn={ChangePost}
        //     SeeCommentBtn={SeeComment}
        //     statusFilter={statusFilter}
        //   />
        //   <MyPagination
        //     cardIndex={index}
        //     count={subcards?.orders?.length || 1}
        //   />
        // </div>
        //               <div
        //                 className={styles.card__btn}
        //                 onClick={handleSlideChange}
        //               >
        //                 {isLoading ? (
        //                   <AccountsLoader />
        //                 ) : isSubcardOpen ? (
        //                   t(`orders_advertiser.card.see_less`)
        //                 ) : (
        //                   t(`orders_advertiser.card.see_more`)
        //                 )}
        //                 {!isLoading && (
        //                   <ArrowSmallVerticalIcon
        //                     className={
        //                       isSubcardOpen
        //                         ? "icon__white rotate side"
        //                         : "icon__white rotate__down side"
        //                     }
        //                   />
        //                 )}
        //               </div>
        //             </SwiperSlide>
        //           ))}
        //         </Swiper>
        //       </div>
        //     </SwiperSlide>
        //   </Swiper>
        // </div>
      )}
    </>
  );
};
