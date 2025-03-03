import {
  DisplayFeed,
  DisplayShorts,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
  PostTypesNum,
  platformTypesNum,
} from "@entities/platform";
import { EmptyPost } from "@entities/platform/ui/displays/displayInstagram/feed/emptyPost";
import {
  CreatePostFormData,
  DateListProps,
  ICreateDate,
  ICreatePostForm,
  IDatetime,
  IPostChannel,
  TimeListProps,
  platformToIcon,
} from "@entities/project";
import { PostIcon2 } from "@shared/assets";
import { useWindowWidth } from "@shared/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui";
import { formatDateToRuString } from "@shared/utils";
import { X } from "lucide-react";
import { FC, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface PostPlatformProps {
  card: IPostChannel;
  CustomCalendar: FC<DateListProps>;
  TimeList: FC<TimeListProps>;
  setValue: UseFormSetValue<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const OrderCard: FC<PostPlatformProps> = ({
  card,
  CustomCalendar,
  TimeList,
  setValue,
  formState,
}) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const getCardData = (datetime: ICreateDate) => {
    const currentCard: IDatetime = (datetime?.orders || []).find(
      (item) => item.order_id === card.id,
    ) || {
      order_id: card?.id,
      time_from: card?.time_from,
      time_to: card?.time_to,
      date: card?.date,
      date_from: card?.date_from,
      date_to: card?.date_to,
    };
    const cardsWithoutCurrent = (datetime.orders || []).filter(
      (item) => item.order_id !== card.id,
    );
    return { currentCard, cardsWithoutCurrent };
  };

  // установка начальных даты и времени если они возвращаются
  useEffect(() => {
    const datetime = formState.datetime;
    const { currentCard, cardsWithoutCurrent } = getCardData(datetime);
    datetime.orders = [...cardsWithoutCurrent, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  }, []);

  const handleChangeTime = (timeList: string[]) => {
    const datetime = formState.datetime;
    const { currentCard, cardsWithoutCurrent } = getCardData(datetime);
    currentCard.time_from = timeList[0];
    currentCard.time_to = timeList[1];
    datetime.orders = [...cardsWithoutCurrent, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  const handleChangeDate = (dateList: Date[]) => {
    const datetime = formState.datetime;
    const { currentCard, cardsWithoutCurrent } = getCardData(datetime);

    if (dateList.length === 1) {
      delete currentCard.date_from;
      delete currentCard.date_to;
      currentCard.date = formatDateToRuString(dateList[0]);
    } else {
      delete currentCard.date;
      currentCard.date_from = formatDateToRuString(dateList[0]);
      currentCard.date_to = formatDateToRuString(dateList[1]);
    }
    datetime.orders = [...cardsWithoutCurrent, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card?.avatar} alt="" />
        </div>
        <div className={styles.title}>
          <Link to={card?.channel_url} target="_blank" className="truncate">
            {card?.name}
          </Link>
          <span className="truncate">{card?.category}</span>
        </div>
        <div className={styles.icon}>
          {card.platform in platformToIcon
            ? platformToIcon[card?.platform]()
            : null}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.type}>
          <CustomCalendar
            onChange={handleChangeDate}
            startDate={
              !!card?.date
                ? card?.date
                : !!card?.date_from && !!card?.date_to
                  ? [card?.date_from, card?.date_to]
                  : undefined
            }
          />
        </div>
        <div className={styles.type}>
          <TimeList
            onChange={handleChangeTime}
            startTime={
              !!card?.time_from && !!card?.time_to
                ? [card?.time_from, card?.time_to]
                : undefined
            }
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className={styles.data}>
              <PostIcon2 />
              <p className={styles.data__see_post}>
                {t("create_order.create.see_post_mobile_btn")}
              </p>
            </div>
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
            {formState?.posts?.length ? (
              <div className="relative">
                <AlertDialogAction>
                  <X
                    className={`absolute ${screen > 475 ? "-right-10 -top-5" : "-right-8 -top-4"} w-[30px] rounded-full p-2 bg-white cursor-pointer`}
                  />
                </AlertDialogAction>
                {card?.platform === platformTypesNum.telegram && (
                  <DisplayTelegram
                    formState={formState}
                    platformId={platformTypesNum.telegram}
                    orderId={card?.id}
                  />
                )}
                {card?.platform === platformTypesNum.instagram &&
                  card?.post_type === PostTypesNum.feed && (
                    <DisplayFeed
                      formState={formState}
                      platformId={platformTypesNum.instagram}
                      postType={PostTypesNum.feed}
                      orderId={card?.id}
                    />
                  )}
                {card?.platform === platformTypesNum.instagram &&
                  card?.post_type === PostTypesNum.FullHd_vertical && (
                    <DisplayStories
                      formState={formState}
                      platformId={platformTypesNum.instagram}
                      postType={PostTypesNum.FullHd_vertical}
                      orderId={card?.id}
                    />
                  )}
                {card?.platform === platformTypesNum.youtube &&
                  card?.post_type === PostTypesNum.FullHd_vertical && (
                    <DisplayShorts
                      formState={formState}
                      platformId={platformTypesNum.youtube}
                      postType={PostTypesNum.FullHd_vertical}
                      orderId={card?.id}
                    />
                  )}
                {card?.platform === platformTypesNum.youtube &&
                  card?.post_type === PostTypesNum.FullHd_horizontal && (
                    <DisplayVideos
                      formState={formState}
                      platformId={platformTypesNum.youtube}
                      postType={PostTypesNum.FullHd_horizontal}
                      orderId={card?.id}
                    />
                  )}
              </div>
            ) : (
              <EmptyPost />
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
