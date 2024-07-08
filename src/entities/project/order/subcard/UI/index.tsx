import {
  EyeIcon,
  ManIcon,
  RatingIcon,
  SubsIcon,
  WomanIcon,
} from "@shared/assets";
import { orderStatus, orderStatusChat } from "@shared/config/orderFilter";
import {
  advManagerProjectStatusFilter,
  managerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import { IAdvProjectSubcard } from "@shared/types/advProject";
import { IChannelChat } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature } from "@shared/types/order";
import { useGetPostQuery } from "@shared/store/services/getPostService";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { X } from "lucide-react";
import { PostTypesNum, platformTypesNum } from "@shared/config/platformTypes";
import {
  DisplayFeed,
  DisplayShorts,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
} from "@entities/platform";

interface AdvSubcardProps {
  subcard: IAdvProjectSubcard;
  FeedbackBtn: FC<IOrderFeature>;
  AcceptBtn: FC<IOrderFeature>;
  RejectBtn: FC<IOrderFeature>;
  CheckBtn: FC<IOrderFeature>;
  SeeBtn: FC;
  ChangeChannelBtn: FC;
  ChannelChatBtn: FC<IChannelChat>;
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
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);
  const { data: post, error } = useGetPostQuery({ order_id: subcard.id });

  if (error) {
    toast({
      variant: "error",
      title: t("toasts.orders_advertiser.reject_post.error"),
    });
    console.error("error: ", error);
  }

  return (
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
          <div className={styles.subcard__left__info__top}>
            <p>{t(`orders_advertiser.subcard.date`)}</p>
            <span>
              {typeof subcard?.publish_date === "object"
                ? subcard?.publish_date?.date_from +
                  " - " +
                  subcard?.publish_date?.date_to
                : subcard?.publish_date}
            </span>
          </div>
          <div>
            <p>{t(`orders_advertiser.subcard.accommodation`)}</p>
            <span>{subcard?.format?.small}</span>
          </div>
        </div>
        <div className={styles.subcard__left__info}>
          <div className={styles.subcard__left__info__top}>
            <p>{t(`orders_advertiser.subcard.time`)}</p>
            <span>
              {subcard?.publish_time?.time_from} -{" "}
              {subcard?.publish_time?.time_to}
            </span>
          </div>
          <div>
            <p>{t(`orders_advertiser.subcard.price`)}</p>
            <span>
              {subcard?.price?.toLocaleString()} {t(`symbol`)}
            </span>
          </div>
        </div>
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
              <ManIcon />
            </div>
            <div
              className="colorline"
              style={{ "--male": `${subcard?.male}%` } as React.CSSProperties}
              data-male={`${subcard?.male}%`}
              data-female={`${subcard?.female}%`}
            />
            <div>
              <WomanIcon />
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
      </div>
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
                <ChangeChannelBtn />
                <CheckBtn />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      {typeFilter === projectTypesFilter.myProject &&
        statusFilter === advManagerProjectStatusFilter.active && (
          <div
            className={`${styles.subcard__chat} ${orderStatusChat.includes(subcard?.api_status) ? "" : "deactive"}`}
          >
            <ChannelChatBtn id={1} />
          </div>
        )}
    </div>
  );
};
