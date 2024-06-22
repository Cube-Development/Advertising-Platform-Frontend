import { CountdownTimer } from "@features/countdownTimer";
import { HappySmileIcon, MoreIcon } from "@shared/assets";
import {
  offerStatus,
  offerStatusChat,
  offerStatusFilter,
} from "@shared/config/offerFilter";
import { platformTypesNum } from "@shared/config/platformTypes";
import { CheckDate } from "@shared/functions/checkDate";
import { useAppSelector } from "@shared/store";
import { useGetPostQuery } from "@shared/store/services/getPostService";
import { IBloggerOfferCard } from "@shared/types/bloggerOffer";
import { IOrderFeature } from "@shared/types/order";
import {
  PostDispayInstagram,
  PostDispayTelegram,
} from "@shared/ui/postDisplay";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { Chat } from "@widgets/header/UI/chat";
import { X } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BloggerOfferCardProps {
  card: IBloggerOfferCard;
  SeeLinkBtn: FC;
  SendLinkBtn: FC<IOrderFeature>;
  AcceptOfferBtn: FC<IOrderFeature>;
  RejectOfferBtn: FC<IOrderFeature>;
  SeeReasonBtn: FC;
}

export const BloggerOfferCard: FC<BloggerOfferCardProps> = ({
  card,
  SeeLinkBtn,
  SendLinkBtn,
  AcceptOfferBtn,
  RejectOfferBtn,
  SeeReasonBtn,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { statusFilter } = useAppSelector((state) => state.filter);
  const { data: post, error } = useGetPostQuery({ order_id: card?.id });

  if (error) {
    toast({
      variant: "error",
      title: t("toasts.orders_advertiser.reject_post.error"),
    });
    console.error("error: ", error);
  }
  console.log(card.publish_date, card.publish_time.time_from);
  return (
    <div
      className={`${styles.card} ${offerStatusChat.includes(statusFilter as offerStatusFilter) ? styles.chat : styles.no__chat} border__gradientt`}
    >
      <div className={styles.card__info}>
        <div className={styles.card__info__data}>
          <div className={styles.card__info__data__description}>
            <img src={card?.avatar} alt="" />
            <div>
              <p>{card?.name}</p>
              <span>{card.category}</span>
            </div>
          </div>
          <div className={styles.card__info__data__date}>
            {/* <span>№{card.id}</span> */}
            <span>{card?.date_coming}</span>
          </div>
        </div>
        {statusFilter === offerStatusFilter.active ||
        statusFilter === offerStatusFilter.wait ? (
          <div className={styles.card__info__timer}>
            <div className={styles.card__info__status}>
              <p>{card?.order_status}</p>
            </div>
            <div className={styles.timer}>
              {/* <CountdownTimer date_to={card.date_coming} time="23:59" /> */}

              <CountdownTimer
                date_to={
                  typeof card?.publish_date === "object"
                    ? card?.publish_date.date_to
                    : card?.publish_date
                }
                time={card.publish_time.time_from}
              />
            </div>
          </div>
        ) : (
          <div className={styles.card__info__status}>
            <p>{card?.order_status}</p>
          </div>
        )}
      </div>

      <div className={styles.card__column}>
        <div className={styles.card__column__top}>
          <p>{t(`offers_blogger.card.date`)}</p>
          <span>
            {typeof card.publish_date === "object"
              ? card?.publish_date?.date_from +
                " - " +
                card?.publish_date.date_to
              : card?.publish_date}
          </span>
        </div>
        <div>
          <p>{t(`offers_blogger.card.accommodation`)}</p>
          <span>{card?.format?.small}</span>
        </div>
      </div>
      <div className={styles.card__column}>
        <div className={styles.card__column__top}>
          <p>{t(`offers_blogger.card.time`)}</p>
          <span>
            {card?.publish_time?.time_from} - {card?.publish_time?.time_to}
          </span>
        </div>
        <div>
          <p>{t(`offers_blogger.card.price`)}</p>
          <span>
            {card.price.toLocaleString()} {t(`symbol`)}
          </span>
        </div>
      </div>
      <>
        {statusFilter === offerStatusFilter.active &&
        card.api_status === offerStatus.in_progress ? (
          <div className={styles.card__active}>
            <div className={styles.card__active__title}>
              <p>{t(`offers_blogger.offer_status.active.title`)}</p>
              <span>
                {typeof card?.publish_date === "object"
                  ? card?.publish_date?.date_from +
                    " - " +
                    card?.publish_date?.date_to
                  : card?.publish_date}{" "}
                {card?.publish_time?.time_from} - {card?.publish_time?.time_to}{" "}
                (UTC +5)
              </span>
            </div>
            <div className={styles.card__active__buttons}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div>
                    <SeeLinkBtn />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center">
                  <div className="w-[18vw] h-full relative">
                    <AlertDialogAction>
                      <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
                    </AlertDialogAction>
                    {post?.platform === platformTypesNum.telegram && (
                      <PostDispayTelegram
                        post={post}
                        platformId={platformTypesNum.telegram}
                      />
                    )}
                    {post?.platform === platformTypesNum.instagram && (
                      <PostDispayInstagram
                        post={post}
                        platformId={platformTypesNum.telegram}
                      />
                    )}
                    {post?.platform === platformTypesNum.youtube && (
                      <p>YOUTUBE</p>
                    )}
                  </div>
                </AlertDialogContent>
              </AlertDialog>
              <div
                className={`${CheckDate(typeof card?.publish_date === "object" ? card?.publish_date.date_to : card?.publish_date) ? "" : "deactive"}`}
              >
                <SendLinkBtn order_id={card?.id} />
              </div>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.active &&
          card.api_status === offerStatus.post_review ? (
          <div className={styles.card__check}>
            <div>
              <p>{t(`offers_blogger.offer_status.check.title`)}</p>
              <span>{t(`offers_blogger.offer_status.check.text`)}</span>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.wait ? (
          <div className={styles.card__wait}>
            <div className={styles.card__wait__title}>
              <p>{t(`offers_blogger.offer_status.wait.title`)}</p>
              <span>{t(`offers_blogger.offer_status.wait.text`)}</span>
            </div>
            <div className={styles.card__wait__buttons}>
              <div>
                <RejectOfferBtn order_id={card?.id} />
                {typeof card.publish_date === "object" &&
                "date_from" in card.publish_date ? (
                  <AcceptOfferBtn
                    order_id={card?.id}
                    dates={card?.publish_date}
                  />
                ) : (
                  <AcceptOfferBtn order_id={card?.id} />
                )}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <p>
                    <SeeLinkBtn />
                  </p>
                </AlertDialogTrigger>
                <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center">
                  <div className="w-[18vw] h-full relative">
                    <AlertDialogAction>
                      <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
                    </AlertDialogAction>
                    {post?.platform === platformTypesNum.telegram && (
                      <PostDispayTelegram
                        post={post}
                        platformId={platformTypesNum.telegram}
                      />
                    )}
                    {post?.platform === platformTypesNum.instagram && (
                      <PostDispayInstagram
                        post={post}
                        platformId={platformTypesNum.telegram}
                      />
                    )}
                    {post?.platform === platformTypesNum.youtube && (
                      <p>YOUTUBE</p>
                    )}
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.completed ? (
          <div className={styles.card__complite}>
            <div>
              <HappySmileIcon />
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.canceled ? (
          <div className={styles.card__cancel}>
            <div>
              <p>{t(`offers_blogger.offer_status.cancel.title`)}</p>
              <span>{t(`offers_blogger.offer_status.cancel.text`)}</span>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.moderation ? (
          <div className={styles.card__moderation}>
            <div>
              <span>{t(`offers_blogger.offer_status.moderation.text`)}</span>
            </div>
          </div>
        ) : statusFilter === offerStatusFilter.unfulfilled ? (
          <div className={styles.card__uncomplite}>
            <div className={styles.card__uncomplite__title}>
              <p>{t(`offers_blogger.offer_status.reject.title`)}</p>
              <span>{t(`offers_blogger.offer_status.reject.text`)}</span>
            </div>
            <div>
              <SeeReasonBtn />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      {offerStatusChat.includes(statusFilter as offerStatusFilter) && (
        <div className={styles.card__more}>
          <div>
            <button>
              <MoreIcon />
            </button>
          </div>
          <div className={styles.chat__btn}>
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
};
