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
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface PostPlatformProps {
  card: IPostChannel;
  cards: IPostChannel[];
  CustomCalendar: FC<DateListProps>;
  TimeList: FC<TimeListProps>;
  setValue: UseFormSetValue<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const OrderCard: FC<PostPlatformProps> = ({
  card,
  cards,
  CustomCalendar,
  TimeList,
  setValue,
  formState,
}) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    // Присваиваем время всем ордерам той же платформы, у которых еще нет времени
    const updatedOtherCards = cardsWithoutCurrent.map((order) => {
      const orderCard = cards.find((c) => c.id === order.order_id);
      if (
        orderCard?.platform === card.platform &&
        !order.time_from &&
        !order.time_to
      ) {
        return {
          ...order,
          time_from: timeList[0],
          time_to: timeList[1],
        };
      }
      return order;
    });

    datetime.orders = [...updatedOtherCards, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  const handleChangeDate = (dateList: Date[]) => {
    const datetime = formState.datetime;
    const { currentCard, cardsWithoutCurrent } = getCardData(datetime);

    let dateValue: string | undefined;
    let dateFrom: string | undefined;
    let dateTo: string | undefined;

    if (dateList.length === 1) {
      delete currentCard.date_from;
      delete currentCard.date_to;
      currentCard.date = formatDateToRuString(dateList[0]);
      dateValue = formatDateToRuString(dateList[0]);
    } else {
      delete currentCard.date;
      currentCard.date_from = formatDateToRuString(dateList[0]);
      currentCard.date_to = formatDateToRuString(dateList[1]);
      dateFrom = formatDateToRuString(dateList[0]);
      dateTo = formatDateToRuString(dateList[1]);
    }

    // Присваиваем дату всем ордерам той же платформы, у которых еще нет даты
    const updatedOtherCards = cardsWithoutCurrent.map((order) => {
      const orderCard = cards.find((c) => c.id === order.order_id);
      const hasNoDate = !order.date && !order.date_from && !order.date_to;
      if (orderCard?.platform === card.platform && hasNoDate) {
        const updatedOrder = { ...order };
        if (dateValue) {
          delete updatedOrder.date_from;
          delete updatedOrder.date_to;
          updatedOrder.date = dateValue;
        } else {
          delete updatedOrder.date;
          updatedOrder.date_from = dateFrom;
          updatedOrder.date_to = dateTo;
        }
        return updatedOrder;
      }
      return order;
    });

    datetime.orders = [...updatedOtherCards, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  const currentOrderData = formState.datetime.orders.find(
    (item) => item.order_id === card.id,
  );

  const selectedDate = currentOrderData?.date;
  const selectedDateFrom = currentOrderData?.date_from;
  const selectedDateTo = currentOrderData?.date_to;
  const selectedTimeFrom = currentOrderData?.time_from;
  const selectedTimeTo = currentOrderData?.time_to;

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card?.avatar} alt="" />
        </div>
        <div className={styles.title}>
          <p className="truncate">{card?.name}</p>
          <span className="truncate">{card?.category}</span>
          <Link
            to={card?.channel_url}
            target="_blank"
            className="mobile-xl:text-[12px] text-[10px] font-medium text-[var(--URL)] break-all"
          >
            {card?.channel_url}
          </Link>
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
              selectedDate
                ? selectedDate
                : selectedDateFrom && selectedDateTo
                  ? [selectedDateFrom, selectedDateTo]
                  : undefined
            }
            platform={card.platform}
          />
        </div>
        <div className={styles.type}>
          <TimeList
            onChange={handleChangeTime}
            startTime={
              !!selectedTimeFrom && !!selectedTimeTo
                ? [selectedTimeFrom, selectedTimeTo]
                : undefined
            }
            selectedDate={selectedDate || undefined}
          />
        </div>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <div className={styles.data}>
              <PostIcon2 />
              <p className="uppercase mobile-xl:block hidden text-[8px] font-bold text-[var(--Personal-colors-main)]">
                See post
              </p>
              <p className={styles.data__see_post}>
                {t("create_order.create.see_post_mobile_btn")}
              </p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent
            showOverlay={false}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 !left-0 !top-0 !translate-x-0 !translate-y-0 !w-full !h-full !max-w-none !max-h-none !rounded-none !border-0 !shadow-none"
          >
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDialogOpen(false)}
            />
            <div
              className={`relative z-50 max-w-[300px] gap-0 bg-transparent grid items-center justify-center shadow-none border-0 ${
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
                  <AlertDialogAction
                    className="!bg-transparent absolute -right-[60px] -top-8"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X
                      className={`w-[30px] rounded-full p-2 bg-white cursor-pointer text-black`}
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
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
