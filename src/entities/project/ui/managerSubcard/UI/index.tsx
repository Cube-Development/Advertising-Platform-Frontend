import { Link } from "react-router-dom";
import { IChatProps } from "@entities/communication";
import {
  GetPostRes,
  IManagerProjectCard,
  IManagerProjectSubcard,
  IOrderFeature,
  desireStatus,
  ENUM_MANAGER_PROJECT_STATUS,
  orderStatus,
  orderStatusChat,
  platformToIcon,
  projectStatus,
  useGetPostQuery,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { ChangeChannelProps, ChangePostProps } from "@features/order";
import {
  ArrowSmallVerticalIcon,
  BoyIcon,
  EyeIcon,
  GirlIcon,
  RatingIcon,
  SubsIcon,
} from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ENUM_PATHS } from "@shared/routing";

interface ManagerProjectSubcardProps {
  card: IManagerProjectCard;
  subcard: IManagerProjectSubcard;
  FeedbackBtn: FC<IOrderFeature>;
  AcceptBtn: FC<IOrderFeature>;
  RejectBtn: FC<IOrderFeature>;
  CheckBtn: FC<IOrderFeature>;
  SeePostBtn: FC<{ post: GetPostRes }>;
  ChangeChannelBtn: FC<ChangeChannelProps>;
  ChangePostBtn: FC<ChangePostProps>;
  SeeCommentBtn: FC;
  ChannelChatBtn: FC<IChatProps>;
  statusFilter: ENUM_MANAGER_PROJECT_STATUS;
}

export const ManagerProjectSubcard: FC<ManagerProjectSubcardProps> = ({
  card,
  subcard,
  FeedbackBtn,
  AcceptBtn,
  RejectBtn,
  CheckBtn,
  SeePostBtn,
  ChannelChatBtn,
  ChangeChannelBtn,
  ChangePostBtn,
  SeeCommentBtn,
  statusFilter,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const screen = useWindowWidth();
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const { data: post, error } = useGetPostQuery({ order_id: subcard.id });

  if (error) {
    toast({
      variant: "error",
      title: t("toasts.orders_advertiser.reject_post.error"),
    });
    console.error("error: ", error);
  }

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  return (
    <div
      className={`${styles.wrapper} ${statusFilter === ENUM_MANAGER_PROJECT_STATUS.ACTIVE ? "" : styles.no__chat}`}
    >
      <div
        className={`${styles.subcard} ${statusFilter === ENUM_MANAGER_PROJECT_STATUS.ACTIVE ? styles.grid__active : styles.grid}`}
      >
        <div className={styles.platform__icon}>
          {subcard?.platform && subcard?.platform in platformToIcon
            ? platformToIcon[subcard?.platform!]()
            : "..."}
        </div>
        <div className={styles.subcard__left}>
          <div className={styles.subcard__left__description}>
            <Link
              to={`${ENUM_PATHS.CHANNEL.replace(":id", subcard?.channel_id || subcard?.id)}`}
              target="_blank"
              className={styles.subcard__left__description__logo}
            >
              <img src={subcard?.avatar} alt="" />
            </Link>
            <div className={styles.subcard__left__description__rate}>
              <RatingIcon rate={subcard?.grade || 0} />
            </div>
            <div className={styles.subcard__left__description__title}>
              <p className="truncate">{subcard?.name}</p>
              <span className="truncate">{subcard?.category}</span>
            </div>
          </div>
          <div className={styles.subcard__left__info}>
            <div className={styles.info__column}>
              <div
                className={`${styles.info__wrapper}  ${styles.first} ${styles.top}`}
              >
                <div>
                  <p>{t(`orders_manager.subcard.date`)}</p>
                  <span className="truncate">
                    {typeof subcard?.publish_date === "object"
                      ? subcard?.publish_date?.date_from +
                        " - " +
                        subcard?.publish_date?.date_to
                      : subcard?.publish_date}
                  </span>
                </div>
              </div>
              <div className={styles.info__wrapper}>
                <div>
                  <p>{t(`orders_manager.subcard.price`)}</p>
                  <span>
                    {subcard?.price?.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.info__column}>
              <div className={`${styles.info__wrapper} ${styles.top}`}>
                <div>
                  <p>{t(`orders_manager.subcard.time`)}</p>
                  <span>
                    {subcard?.publish_time?.time_from} -{" "}
                    {subcard?.publish_time?.time_to}
                  </span>
                </div>
              </div>
              <div className={`${styles.info__wrapper} ${styles.last}`}>
                <div>
                  <p>{t(`orders_manager.subcard.accommodation`)}</p>
                  <span className="truncate">{subcard?.format?.small}</span>
                </div>
              </div>
            </div>
          </div>
          {screen > BREAKPOINT.LG && (
            <div className={styles.subcard__left__data}>
              <div className={styles.subcard__left__data__row}>
                <div className={styles.info}>
                  <div>
                    <SubsIcon />
                  </div>
                  <span>{subcard?.subscribers?.toLocaleString()}</span>
                </div>
                <div className={styles.info}>
                  <div>
                    <EyeIcon />
                  </div>
                  <span>{subcard?.views?.toLocaleString()}</span>
                </div>
              </div>
              <div className={styles.subcard__left__data__middle}>
                <div>
                  <BoyIcon />
                </div>
                <div
                  className="colorline"
                  style={
                    { "--male": `${subcard?.male}%` } as React.CSSProperties
                  }
                  data-male={`${subcard?.male}%`}
                  data-female={`${subcard?.female}%`}
                />
                <div>
                  <GirlIcon />
                </div>
              </div>
              <div className={styles.subcard__left__data__row}>
                <div className={styles.info}>
                  <p>ER:</p>
                  <span>{subcard?.er}%</span>
                </div>
                <div className={styles.info}>
                  <p>CPV:</p>
                  <span>
                    {subcard?.cpv?.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {screen > BREAKPOINT.MD && (
          <>
            {subcard?.desire?.length &&
            statusFilter !== ENUM_MANAGER_PROJECT_STATUS.ACTIVE ? (
              <div className={styles.subcard__posted}>
                <div className={styles.subcard__posted__title}>
                  <p>{t(`orders_manager.order_status.comment.title`)}</p>
                </div>
                <div className={styles.subcard__posted__buttons}>
                  <div className={styles.subcard__posted__buttons__top}>
                    {subcard?.desire.length === 2 ? (
                      <>
                        <ChangePostBtn order={subcard} />
                        <ChangeChannelBtn order={subcard} />
                      </>
                    ) : subcard?.desire[0].desire_type ===
                      desireStatus.replace_channel_request ? (
                      <ChangeChannelBtn order={subcard} />
                    ) : (
                      <ChangePostBtn order={subcard} />
                    )}
                  </div>
                  <SeePostBtn post={post!} />
                </div>
              </div>
            ) : subcard?.api_status === orderStatus.canceled ||
              subcard?.api_status === orderStatus.rejected ? (
              <div className={styles.subcard__cancel}>
                {statusFilter === ENUM_MANAGER_PROJECT_STATUS.COMPLETED ? (
                  <p>{t(`orders_manager.order_status.rejected.title2`)}</p>
                ) : (
                  <>
                    <p>{t(`orders_manager.order_status.rejected.title`)}</p>
                    <span>
                      {t(`orders_manager.order_status.rejected.text`)}
                    </span>
                  </>
                )}
              </div>
            ) : subcard?.api_status === orderStatus.completed ||
              subcard?.api_status === orderStatus.adv_accept ? (
              <div className={styles.subcard__completed}>
                <p>{t(`orders_manager.order_status.completed.title2`)}</p>
                {!subcard?.is_review && <FeedbackBtn order_id={subcard?.id} />}
              </div>
            ) : subcard?.api_status === orderStatus.post_review ? (
              <div className={styles.subcard__posted}>
                <div className={styles.subcard__posted__title}>
                  <p>{t(`orders_manager.order_status.posted.title`)}</p>
                  <span>{t(`orders_manager.order_status.posted.text`)}</span>
                </div>
                <div className={styles.subcard__posted__buttons}>
                  <div className={styles.subcard__posted__buttons__top}>
                    <AcceptBtn order_id={subcard.id} />
                    <RejectBtn order_id={subcard.id} />
                  </div>
                  <CheckBtn url={subcard?.post_url} />
                </div>
              </div>
            ) : subcard?.api_status === orderStatus.in_progress ? (
              <div className={styles.subcard__accepted}>
                <p>{t(`orders_manager.order_status.accepted.title`)}</p>
                <span>{t(`orders_manager.order_status.accepted.text`)}</span>
                <SeePostBtn post={post!} />
              </div>
            ) : subcard?.api_status === orderStatus.moderation ? (
              <div className={styles.subcard__moderation}>
                <div>
                  <p>{t(`orders_manager.order_status.moderation.title`)}</p>
                  <span>
                    {t(`orders_manager.order_status.moderation.text`)}
                    <small>
                      {t(`orders_manager.order_status.moderation.small`)}
                    </small>
                  </span>
                </div>
              </div>
            ) : subcard?.api_status === orderStatus.wait ? (
              <div className={styles.subcard__waiting}>
                <div>
                  <p>{t(`orders_manager.order_status.waiting.title`)}</p>
                  <SeePostBtn post={post!} />
                </div>
              </div>
            ) : subcard?.api_status === orderStatus.order_review ? (
              <div className={styles.subcard__agreed}>
                <div>
                  <p>
                    {card?.is_request_approve === projectStatus.approved ||
                    (card?.is_request_approve === projectStatus.changed &&
                      subcard?.desire?.length === 0)
                      ? t(`orders_manager.order_status.agreed.title.approved`)
                      : card?.is_request_approve ===
                          projectStatus.request_approve
                        ? t(
                            `orders_manager.order_status.agreed.title.request_approve`,
                          )
                        : ""}
                  </p>
                  <div>
                    <SeePostBtn post={post!} />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {screen > BREAKPOINT.MD &&
          statusFilter === ENUM_MANAGER_PROJECT_STATUS.ACTIVE && (
            <div
              // className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
              className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : ""}`}
            >
              <ChannelChatBtn
                orderId={subcard?.id}
                toRole={ENUM_ROLES.BLOGGER}
              />
            </div>
          )}
      </div>
      {screen < BREAKPOINT.LG && screen >= BREAKPOINT.MD ? (
        <Accordion type="single" collapsible>
          <AccordionItem
            value={`item-${subcard?.id}`}
            className={styles.channel__data__md}
          >
            <AccordionTrigger onClick={handleChangeOpenSubcard}>
              <div className={styles.channel__data_row}>
                <div className={styles.data}>
                  <div>
                    <SubsIcon />
                  </div>
                  <span>{subcard?.subscribers?.toLocaleString()}</span>
                </div>
                <div className={styles.data}>
                  <div>
                    <EyeIcon />
                  </div>
                  <span>{subcard?.views!.toLocaleString()}</span>
                </div>
                <div className={styles.arrow}>
                  <ArrowSmallVerticalIcon
                    className={
                      isSubcardOpen
                        ? "icon__grey rotate"
                        : "icon__grey rotate__down"
                    }
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className={styles.channel__content}>
              <div className={styles.channel__data_middle}>
                <div className={styles.middle}>
                  <div>
                    <BoyIcon />
                  </div>
                  <div
                    className="colorline"
                    style={
                      { "--male": `${subcard?.male}%` } as React.CSSProperties
                    }
                    data-male={`${subcard?.male}%`}
                    data-female={`${subcard?.female}%`}
                  />
                  <div>
                    <GirlIcon />
                  </div>
                </div>
              </div>
              <div className={styles.channel__data_row}>
                <div className={styles.data}>
                  <p>ER:</p>
                  <span>{subcard?.er}%</span>
                </div>
                <div className={styles.data}>
                  <p>CPV:</p>
                  <span>
                    {subcard?.cpv!.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : screen < BREAKPOINT.MD ? (
        <div className={styles.channel__xs}>
          <div className={styles.channel__data__xs}>
            <div className={styles.channel__data_row}>
              <div className={styles.data}>
                <div>
                  <SubsIcon />
                </div>
                <span>{subcard?.subscribers?.toLocaleString()}</span>
              </div>
              <div className={styles.data}>
                <div>
                  <EyeIcon />
                </div>
                <span>{subcard?.views!.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {screen <= BREAKPOINT.MD && (
        <>
          {statusFilter === ENUM_MANAGER_PROJECT_STATUS.ACTIVE && (
            <div
              className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
            >
              <ChannelChatBtn
                orderId={subcard?.id}
                toRole={ENUM_ROLES.BLOGGER}
                isFull={true}
              />
            </div>
          )}

          {subcard?.desire?.length ? (
            <div className={styles.subcard__posted}>
              <div className={styles.subcard__posted__title}>
                <p>{t(`orders_manager.order_status.comment.title`)}</p>
              </div>
              <div className={styles.subcard__posted__buttons}>
                <div className={styles.subcard__posted__buttons__top}>
                  {subcard?.desire.length === 2 ? (
                    <>
                      <ChangePostBtn order={subcard} />
                      <ChangeChannelBtn order={subcard} />
                    </>
                  ) : subcard?.desire[0].desire_type ===
                    desireStatus.replace_channel_request ? (
                    <ChangeChannelBtn order={subcard} />
                  ) : (
                    <ChangePostBtn order={subcard} />
                  )}
                </div>
                <SeePostBtn post={post!} />
              </div>
            </div>
          ) : subcard?.api_status === orderStatus.canceled ||
            subcard?.api_status === orderStatus.rejected ? (
            <div className={styles.subcard__cancel}>
              {statusFilter === ENUM_MANAGER_PROJECT_STATUS.COMPLETED ? (
                <p>{t(`orders_manager.order_status.rejected.title2`)}</p>
              ) : (
                <>
                  <p>{t(`orders_manager.order_status.rejected.title`)}</p>
                  <span>{t(`orders_manager.order_status.rejected.text`)}</span>
                </>
              )}
            </div>
          ) : subcard?.api_status === orderStatus.completed ||
            subcard?.api_status === orderStatus.adv_accept ? (
            <div className={styles.subcard__completed}>
              {statusFilter === ENUM_MANAGER_PROJECT_STATUS.COMPLETED ? (
                <p>{t(`orders_advertiser.order_status.completed.title2`)}</p>
              ) : (
                <>
                  <p>{t(`orders_advertiser.order_status.completed.title`)}</p>
                  {!subcard?.is_review && (
                    <FeedbackBtn order_id={subcard?.id} />
                  )}
                </>
              )}
            </div>
          ) : subcard?.api_status === orderStatus.post_review ? (
            <div className={styles.subcard__posted}>
              <div className={styles.subcard__posted__title}>
                <p>{t(`orders_advertiser.order_status.posted.title`)}</p>
                <span>{t(`orders_advertiser.order_status.posted.text`)}</span>
              </div>
              <div className={styles.subcard__posted__buttons}>
                <CheckBtn url={subcard?.post_url} />
                <div className={styles.subcard__posted__buttons__top}>
                  <AcceptBtn order_id={subcard?.id} />
                  <RejectBtn order_id={subcard?.id} />
                </div>
              </div>
            </div>
          ) : subcard?.api_status === orderStatus.in_progress ? (
            <div className={styles.subcard__accepted}>
              <p>{t(`orders_manager.order_status.accepted.title`)}</p>
              <span>{t(`orders_manager.order_status.accepted.text`)}</span>
              <SeePostBtn post={post!} />
            </div>
          ) : subcard?.api_status === orderStatus.moderation ? (
            <div className={styles.subcard__moderation}>
              <div>
                <p>{t(`orders_advertiser.order_status.moderation.title`)}</p>
                <span>
                  {t(`orders_advertiser.order_status.moderation.text`)}
                  <small>
                    {t(`orders_advertiser.order_status.moderation.small`)}
                  </small>
                </span>
              </div>
            </div>
          ) : subcard?.api_status === orderStatus.wait ? (
            <div className={styles.subcard__waiting}>
              <div>
                <p>{t(`orders_manager.order_status.waiting.title`)}</p>
                <SeePostBtn post={post!} />
              </div>
            </div>
          ) : subcard?.api_status === orderStatus.order_review ? (
            <div className={styles.subcard__agreed}>
              <div>
                <p>
                  {card?.is_request_approve === projectStatus.approved ||
                  (card?.is_request_approve === projectStatus.changed &&
                    subcard?.desire?.length === 0)
                    ? t(`orders_manager.order_status.agreed.title.approved`)
                    : card?.is_request_approve === projectStatus.request_approve
                      ? t(
                          `orders_manager.order_status.agreed.title.request_approve`,
                        )
                      : ""}
                </p>
                <div>
                  <SeePostBtn post={post!} />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
