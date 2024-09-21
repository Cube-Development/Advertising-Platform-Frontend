import { channelStatusFilter } from "@entities/channel";
import { IChatOpen } from "@entities/communication";
import { offerStatusFilter } from "@entities/offer";
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
  IAdvProjectSubcard,
  IOrderFeature,
  advManagerProjectStatusFilter,
  managerProjectStatusFilter,
  myProjectStatusFilter,
  orderStatus,
  orderStatusChat,
  projectTypesFilter,
} from "@entities/project";
import { roles } from "@entities/user";
import {
  ArrowSmallVerticalIcon,
  BoyIcon,
  EyeIcon,
  GirlIcon,
  RatingIcon,
  SubsIcon,
} from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  useToast,
} from "@shared/ui";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AdvSubcardProps {
  subcard: IAdvProjectSubcard;
  FeedbackBtn: FC<IOrderFeature>;
  AcceptBtn: FC<IOrderFeature>;
  RejectBtn: FC<IOrderFeature>;
  CheckBtn: FC<IOrderFeature>;
  SeeBtn: FC;
  ChangeChannelBtn: FC<{ project_id: string }>;
  ChannelChatBtn: FC<IChatOpen>;
  typeFilter: string;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const AdvSubcard: FC<AdvSubcardProps> = ({
  subcard,
  FeedbackBtn,
  AcceptBtn,
  RejectBtn,
  CheckBtn,
  SeeBtn,
  ChannelChatBtn,
  ChangeChannelBtn,
  typeFilter,
  statusFilter,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  // const { data: post, error } = useGetPostQuery({ order_id: subcard.id });
  const post = {
    id: "string",
    platform: 1,
    comment: "string",
    photo: ["ff"],
    video: ["ff"],
    files: ["ff"],
    buttons: [
      {
        id: "string",
        content: "string",
        url: "string",
      },
    ],
    text: ["dd"],
    post_type: 1,
  };
  // const error = 5
  // if (error) {
  //   toast({
  //     variant: "error",
  //     title: t("toasts.orders_advertiser.reject_post.error"),
  //   });
  //   console.error("error: ", error);
  // }

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  return (
    <div
      className={`${styles.wrapper} ${(typeFilter === projectTypesFilter.myProject && statusFilter === advManagerProjectStatusFilter.completed) || typeFilter === projectTypesFilter.managerProject ? styles.no__chat : ""}`}
    >
      <div
        className={`${styles.subcard} ${typeFilter === projectTypesFilter.myProject && statusFilter === advManagerProjectStatusFilter.active ? styles.grid__active : styles.grid}`}
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
              <p>{subcard?.name}</p>
              <span>{subcard?.category}</span>
            </div>
          </div>
          <div className={styles.subcard__left__info}>
            <div className={styles.info__column}>
              <div
                className={`${styles.info__wrapper}  ${styles.first} ${styles.top}`}
              >
                <div>
                  <p>{t(`orders_advertiser.subcard.date`)}</p>
                  <span>
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
                  <p>{t(`orders_advertiser.subcard.price`)}</p>
                  <span>
                    {subcard?.price?.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.info__column}>
              <div className={`${styles.info__wrapper} ${styles.top}`}>
                <div>
                  <p>{t(`orders_advertiser.subcard.time`)}</p>
                  <span>
                    {subcard?.publish_time?.time_from} -{" "}
                    {subcard?.publish_time?.time_to}
                  </span>
                </div>
              </div>
              <div className={`${styles.info__wrapper} ${styles.last}`}>
                <div>
                  <p>{t(`orders_advertiser.subcard.accommodation`)}</p>
                  <span>{subcard?.format?.small}</span>
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
            {subcard?.api_status === orderStatus.canceled ||
            subcard?.api_status === orderStatus.rejected ? (
              <div className={styles.subcard__cancel}>
                {typeFilter === projectTypesFilter.managerProject &&
                statusFilter === managerProjectStatusFilter.completed ? (
                  <p>{t(`orders_advertiser.order_status.rejected.title2`)}</p>
                ) : (
                  <>
                    <p>{t(`orders_advertiser.order_status.rejected.title`)}</p>
                    <span>
                      {typeFilter === projectTypesFilter.managerProject
                        ? t(`orders_advertiser.order_status.rejected.text2`)
                        : statusFilter === myProjectStatusFilter.completed ||
                          t(`orders_advertiser.order_status.rejected.text`)}
                    </span>
                  </>
                )}
              </div>
            ) : subcard?.api_status === orderStatus.completed ? (
              <div className={styles.subcard__completed}>
                {typeFilter === projectTypesFilter.managerProject &&
                statusFilter === managerProjectStatusFilter.completed ? (
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
                  {typeFilter === projectTypesFilter.managerProject || (
                    <span>
                      {t(`orders_advertiser.order_status.posted.text`)}
                    </span>
                  )}
                </div>
                <div className={styles.subcard__posted__buttons}>
                  {typeFilter === projectTypesFilter.managerProject || (
                    <div className={styles.subcard__posted__buttons__top}>
                      <AcceptBtn order_id={subcard?.id} />
                      <RejectBtn order_id={subcard?.id} />
                    </div>
                  )}
                  <CheckBtn url={subcard?.post_url} />
                </div>
              </div>
            ) : subcard?.api_status === orderStatus.in_progress ? (
              <div className={styles.subcard__accepted}>
                <p>{t(`orders_advertiser.order_status.accepted.title`)}</p>
                {typeFilter === projectTypesFilter.managerProject || (
                  <span>
                    {t(`orders_advertiser.order_status.accepted.text`)}
                  </span>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div>
                      <SeeBtn />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center shadow-none">
                    <div className="w-[18vw] h-full relative">
                      <AlertDialogAction>
                        <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
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
                      <div>
                        <SeeBtn />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center shadow-none">
                      <div className="w-[18vw] h-full relative">
                        <AlertDialogAction>
                          <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
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
                          post?.post_type ===
                            PostTypesNum.FullHd_horizontal && (
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
                  <p>{t(`orders_advertiser.order_status.agreed.title`)}</p>
                  <div>
                    <ChangeChannelBtn project_id={"sfsdf"} />
                    <CheckBtn />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {screen > BREAKPOINT.MD &&
          typeFilter === projectTypesFilter.myProject &&
          statusFilter === advManagerProjectStatusFilter.active && (
            <div
              className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
            >
              <ChannelChatBtn orderId={"1"} />
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
          {typeFilter === projectTypesFilter.myProject &&
            statusFilter === advManagerProjectStatusFilter.active && (
              <div
                className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
              >
                <ChannelChatBtn orderId={"1"} toRole={roles.blogger} />
              </div>
            )}
          {subcard?.api_status === orderStatus.canceled ||
          subcard?.api_status === orderStatus.rejected ? (
            <div className={styles.subcard__cancel}>
              {typeFilter === projectTypesFilter.managerProject &&
              statusFilter === managerProjectStatusFilter.completed ? (
                <p>{t(`orders_advertiser.order_status.rejected.title2`)}</p>
              ) : (
                <>
                  <p>{t(`orders_advertiser.order_status.rejected.title`)}</p>
                  <span>
                    {typeFilter === projectTypesFilter.managerProject
                      ? t(`orders_advertiser.order_status.rejected.text2`)
                      : statusFilter === myProjectStatusFilter.completed ||
                        t(`orders_advertiser.order_status.rejected.text`)}
                  </span>
                </>
              )}
            </div>
          ) : subcard?.api_status === orderStatus.completed ? (
            <div className={styles.subcard__completed}>
              {typeFilter === projectTypesFilter.managerProject &&
              statusFilter === managerProjectStatusFilter.completed ? (
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
                {typeFilter === projectTypesFilter.managerProject || (
                  <span>{t(`orders_advertiser.order_status.posted.text`)}</span>
                )}
              </div>
              <div className={styles.subcard__posted__buttons}>
                {typeFilter === projectTypesFilter.managerProject || (
                  <div className={styles.subcard__posted__buttons__top}>
                    <AcceptBtn order_id={subcard?.id} />
                    <RejectBtn order_id={subcard?.id} />
                  </div>
                )}
                <CheckBtn url={subcard?.post_url} />
              </div>
            </div>
          ) : subcard?.api_status === orderStatus.in_progress ? (
            <div className={styles.subcard__accepted}>
              <p>{t(`orders_advertiser.order_status.accepted.title`)}</p>
              {typeFilter === projectTypesFilter.managerProject || (
                <span>{t(`orders_advertiser.order_status.accepted.text`)}</span>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div>
                    <SeeBtn />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center shadow-none">
                  <div className="w-[18vw] h-full relative">
                    <AlertDialogAction>
                      <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
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
                    <div>
                      <SeeBtn />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center shadow-none">
                    <div className="w-[18vw] h-full relative">
                      <AlertDialogAction>
                        <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
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
                <p>{t(`orders_advertiser.order_status.agreed.title`)}</p>
                <div>
                  <ChangeChannelBtn project_id={"sfsdf"} />
                  <CheckBtn />
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
