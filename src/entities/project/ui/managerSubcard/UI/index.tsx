import { IChatProps } from "@entities/communication";
import {
  DisplayFeed,
  DisplayShorts,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
  PostTypesNum,
  platformTypesNum,
} from "@entities/platform";
import {
  GetPostRes,
  IManagerProjectCard,
  IManagerProjectSubcard,
  IOrderFeature,
  desireStatus,
  managerProjectStatusFilter,
  orderStatus,
  orderStatusChat,
  projectStatus,
  useGetPostQuery,
} from "@entities/project";
import { roles } from "@entities/user";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  useToast,
} from "@shared/ui";
import { X } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

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
  statusFilter: managerProjectStatusFilter;
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
    <div className={styles.wrapper}>
      <div
        className={`${styles.subcard} ${statusFilter === managerProjectStatusFilter.active ? styles.grid__active : styles.grid}`}
      >
        <div className={styles.subcard__left}>
          <div className={styles.subcard__left__description}>
            <div className={styles.subcard__left__description__logo}>
              <img src={subcard?.avatar} alt="" />
            </div>
            <div className={styles.subcard__left__description__rate}>
              <RatingIcon />
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
                {statusFilter === managerProjectStatusFilter.completed ? (
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
            ) : subcard?.api_status === orderStatus.completed ? (
              <div className={styles.subcard__completed}>
                {statusFilter === managerProjectStatusFilter.completed ? (
                  <p>{t(`orders_manager.order_status.completed.title2`)}</p>
                ) : (
                  <>
                    <p>{t(`orders_manager.order_status.completed.title`)}</p>
                    <FeedbackBtn />
                  </>
                )}
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
                  <CheckBtn />
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
          statusFilter === managerProjectStatusFilter.active && (
            <div
              // className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
              className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : ""}`}
            >
              <ChannelChatBtn orderId={subcard?.id} toRole={roles.blogger} />
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
          {/* {statusFilter === managerProjectStatusFilter.active && (
            <div
              className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
            >
              <ChannelChatBtn
                orderId={subcard?.id}
                toRole={roles.blogger}
                isFull={true}
              />
            </div>
          )} */}

          {statusFilter === managerProjectStatusFilter.active ? (
            <div
              className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
            >
              <ChannelChatBtn
                orderId={subcard?.id}
                toRole={roles.blogger}
                isFull={true}
              />
            </div>
          ) : subcard?.desire?.length ? (
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
              {statusFilter === managerProjectStatusFilter.completed ? (
                <p>{t(`orders_advertiser.order_status.rejected.title2`)}</p>
              ) : (
                <>
                  <p>{t(`orders_advertiser.order_status.rejected.title`)}</p>
                  {/* <span>
                    {typeFilter === projectTypesFilter.managerProject
                      ? t(`orders_advertiser.order_status.rejected.text2`)
                      : statusFilter === myProjectStatusFilter.completed ||
                        t(`orders_advertiser.order_status.rejected.text`)}
                  </span> */}
                </>
              )}
            </div>
          ) : subcard?.api_status === orderStatus.completed ? (
            <div className={styles.subcard__completed}>
              {statusFilter === managerProjectStatusFilter.completed ? (
                <p>{t(`orders_advertiser.order_status.completed.title2`)}</p>
              ) : (
                <>
                  <p>{t(`orders_advertiser.order_status.completed.title`)}</p>
                  <FeedbackBtn order_id={subcard?.id} />
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
              <p>{t(`orders_advertiser.order_status.accepted.title`)}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div>{/* <SeeBtn /> */} 2</div>
                </AlertDialogTrigger>
                <AlertDialogContent
                  className={`max-w-[300px] gap-0 bg-transparent grid items-center justify-center shadow-none border-0 ${
                    screen > 992
                      ? "w-[25vw]"
                      : screen > 768
                        ? "w-[30vw]"
                        : screen > 576
                          ? "w-[35vw]"
                          : screen > 475
                            ? "w-[50vw]"
                            : "w-[60vw]"
                  }`}
                >
                  <AlertDialogDescription className="sr-only"></AlertDialogDescription>
                  <AlertDialogTitle className="sr-only"></AlertDialogTitle>
                  <div className="relative">
                    <AlertDialogAction>
                      <X
                        className={`absolute ${screen > 475 ? "-right-10 -top-5" : "-right-8 -top-4"} w-[30px] rounded-full p-2 bg-white cursor-pointer`}
                      />
                    </AlertDialogAction>
                    {post?.platform === platformTypesNum.telegram && (
                      <DisplayTelegram
                        post={post}
                        platformId={platformTypesNum.telegram}
                      />
                    )}
                    {post?.platform === platformTypesNum.instagram &&
                      post?.post_type === PostTypesNum.feed && (
                        <DisplayFeed
                          post={post}
                          platformId={platformTypesNum.instagram}
                        />
                      )}
                    {post?.platform === platformTypesNum.instagram &&
                      post?.post_type === PostTypesNum.FullHd_vertical && (
                        <DisplayStories
                          post={post}
                          platformId={platformTypesNum.instagram}
                        />
                      )}
                    {post?.platform === platformTypesNum.youtube &&
                      post?.post_type === PostTypesNum.FullHd_vertical && (
                        <DisplayShorts
                          post={post}
                          platformId={platformTypesNum.youtube}
                        />
                      )}
                    {post?.platform === platformTypesNum.youtube &&
                      post?.post_type === PostTypesNum.FullHd_horizontal && (
                        <DisplayVideos
                          post={post}
                          platformId={platformTypesNum.youtube}
                        />
                      )}
                  </div>
                </AlertDialogContent>
              </AlertDialog>
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
                <p>{t(`orders_advertiser.order_status.waiting.title`)}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div>{/* <SeeBtn /> */}2</div>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    className={`max-w-[300px] gap-0 bg-transparent grid items-center justify-center shadow-none ${
                      screen > 992
                        ? "w-[25vw]"
                        : screen > 768
                          ? "w-[30vw]"
                          : screen > 576
                            ? "w-[35vw]"
                            : screen > 475
                              ? "w-[50vw]"
                              : "w-[60vw]"
                    }`}
                  >
                    <AlertDialogDescription className="sr-only"></AlertDialogDescription>
                    <AlertDialogTitle className="sr-only"></AlertDialogTitle>
                    <div className="relative">
                      <AlertDialogAction>
                        <X
                          className={`absolute ${screen > 475 ? "-right-10 -top-5" : "-right-8 -top-4"} w-[30px] rounded-full p-2 bg-white cursor-pointer`}
                        />
                      </AlertDialogAction>
                      {post?.platform === platformTypesNum.telegram && (
                        <DisplayTelegram
                          post={post}
                          platformId={platformTypesNum.telegram}
                        />
                      )}
                      {post?.platform === platformTypesNum.instagram &&
                        post?.post_type === PostTypesNum.feed && (
                          <DisplayFeed
                            post={post}
                            platformId={platformTypesNum.instagram}
                          />
                        )}
                      {post?.platform === platformTypesNum.instagram &&
                        post?.post_type === PostTypesNum.FullHd_vertical && (
                          <DisplayStories
                            post={post}
                            platformId={platformTypesNum.instagram}
                          />
                        )}
                      {post?.platform === platformTypesNum.youtube &&
                        post?.post_type === PostTypesNum.FullHd_vertical && (
                          <DisplayShorts
                            post={post}
                            platformId={platformTypesNum.youtube}
                          />
                        )}
                      {post?.platform === platformTypesNum.youtube &&
                        post?.post_type === PostTypesNum.FullHd_horizontal && (
                          <DisplayVideos
                            post={post}
                            platformId={platformTypesNum.youtube}
                          />
                        )}
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
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
