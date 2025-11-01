import {
  IManagerProjectCard,
  ManagerProjectSubcard,
  getProjectSubcardReq,
  ENUM_MANAGER_PROJECT_STATUS,
  projectStatus,
  useGetManagerSubprojectsQuery,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
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
  EditProject,
  LaunchProject,
  SendReport,
  SendToBot,
  TechnicalSpecification,
} from "@features/project";
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
import { useWindowWidth } from "@shared/hooks";
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

interface MyManagerProjectCardProps {
  card: IManagerProjectCard;
  statusFilter: ENUM_MANAGER_PROJECT_STATUS;
}

const Card: FC<MyManagerProjectCardProps> = ({ card, statusFilter }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.card} ${statusFilter === ENUM_MANAGER_PROJECT_STATUS.REQUEST_APPROVE ? styles.request_approve : ""} ${statusFilter === ENUM_MANAGER_PROJECT_STATUS.COMPLETED ? styles.card__manager_completed : ""}`}
    >
      <div className={styles.card__description}>
        <div className={styles.card__description__data}>
          <div className={styles.card__description__data__title}>
            <p className="truncate">{card?.project_name}</p>
            <span>№{card?.identifier}</span>
          </div>
          <div className={styles.card__description__data__date}>
            <span className="gradient_color">{card?.tariff_name}</span>
            <span>{card?.tariff_date}</span>
          </div>
        </div>
        <div className={styles.card__description__status}>
          <p>
            {statusFilter === ENUM_MANAGER_PROJECT_STATUS.ACTIVE
              ? t("orders_manager.card.status.active")
              : statusFilter === ENUM_MANAGER_PROJECT_STATUS.COMPLETED
                ? t("orders_manager.card.status.completed")
                : t("orders_manager.card.status.agreed")}
          </p>
        </div>
      </div>
      <div className={`${styles.buttons__md} display__hide__min__md`}>
        <div className={styles.chat__btn}>
          <Chat projectId={card?.project_id} toRole={ENUM_ROLES.ADVERTISER} />
        </div>
        <div className={styles.ts__btn}>
          <TechnicalSpecification card={card} SendToBotBtn={SendToBot} />
        </div>
      </div>
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
          {statusFilter === ENUM_MANAGER_PROJECT_STATUS.COMPLETED && (
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
          {statusFilter === ENUM_MANAGER_PROJECT_STATUS.REQUEST_APPROVE ? (
            <div className={styles.card__info__icons_manager_request_approve}>
              <div>
                <span>
                  {card?.is_request_approve === projectStatus.approved
                    ? t("orders_manager.card.approved")
                    : card?.is_request_approve === projectStatus.changed
                      ? t("orders_manager.card.changed")
                      : card?.is_request_approve ===
                          projectStatus.request_approve
                        ? t("orders_manager.card.request_approve")
                        : ""}
                </span>
              </div>
              {card?.is_request_approve === projectStatus.changed ? (
                <EditProject project_id={card?.project_id} />
              ) : (
                <LaunchProject
                  project_id={card?.project_id}
                  status={card?.is_request_approve!}
                />
              )}
            </div>
          ) : statusFilter === ENUM_MANAGER_PROJECT_STATUS.COMPLETED ? (
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
                <SendReport project_id={card?.project_id} />
              </div>
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
                <p>{card?.canceled?.toLocaleString()}</p>
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
          <Chat
            projectId={card?.project_id}
            toRole={ENUM_ROLES.ADVERTISER}
            isProject={true}
          />
        </div>
      </div>
    </div>
  );
};

export const MyManagerProjectCard: FC<MyManagerProjectCardProps> = ({
  card,
  statusFilter,
}) => {
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const screen = useWindowWidth();
  const { t } = useTranslation();
  const language = useFindLanguage();
  const swiperRef = useRef<SwiperCore | null>(null);

  const getParams: getProjectSubcardReq = {
    project_id: card?.project_id,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
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
    state === ENUM_ACCORDION_TYPES.OPEN
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
            value={`item-${card?.id}`}
            ref={accordionRef}
            className="border-none"
          >
            <AccordionContent>
              <div className={`${styles.subcard} `}>
                {subcards?.orders?.map((subcard, index) => (
                  <ManagerProjectSubcard
                    key={index}
                    card={card}
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
                {isSubcardOpen
                  ? t(`orders_manager.card.see_less`)
                  : t(`orders_manager.card.see_more`)}
                {!isLoading ? (
                  <ArrowSmallVerticalIcon
                    className={
                      isSubcardOpen
                        ? "icon__white rotate"
                        : "icon__white rotate__down"
                    }
                  />
                ) : (
                  <div className="loader">
                    <AccountsLoader />
                  </div>
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
                          card={card}
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
            {isLoading ? (
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
