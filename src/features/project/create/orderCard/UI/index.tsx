import { FC } from "react";
import styles from "./styles.module.scss";
import {
  DateListProps,
  ICreatePostForm,
  IDatetime,
  IPostChannel,
  TimeListProps,
} from "@shared/types/createPost";
import { PostIcon } from "@shared/assets";
import { CreatePostFormData } from "@shared/config/createPostData";
import { platformToIcon } from "@shared/config/platformData";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { PostTypesNum, platformTypesNum } from "@shared/config/platformTypes";
import {
  DisplayFeed,
  DisplayShorts,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
} from "@entities/platform";
import { EmptyPost } from "@entities/platform/displays/displayTelegram/UI/emptyPost";

interface PostPlatformProps {
  card: IPostChannel;
  CustomCalendar: FC<DateListProps>;
  TimeList: FC<TimeListProps>;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const OrderCard: FC<PostPlatformProps> = ({
  card,
  CustomCalendar,
  TimeList,
  setValue,
  getValues,
  formState,
}) => {
  const handleChangeTime = (timeList: string[]) => {
    const form: ICreatePostForm = getValues();
    const datetime = form.datetime;
    const currentCard: IDatetime = (datetime.orders || []).find(
      (item) => item.order_id === card.id,
    ) || {
      order_id: card.id,
    };
    const allCards = (datetime.orders || []).filter(
      (item) => item.order_id !== card.id,
    );
    currentCard.time_from = timeList[0];
    currentCard.time_to = timeList[1];

    datetime.orders = [...allCards, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  const handleChangeDate = (dateList: Date[]) => {
    const form: ICreatePostForm = getValues();
    const datetime = form.datetime;
    const currentCard: IDatetime = (datetime.orders || []).find(
      (item) => item?.order_id === card?.id,
    ) || {
      order_id: card?.id,
    };
    const allCards = (datetime.orders || []).filter(
      (item) => item.order_id !== card?.id,
    );

    if (dateList.length === 1) {
      delete currentCard.date_from;
      delete currentCard.date_to;
      currentCard.date = dateList[0].toLocaleDateString();
    } else {
      delete currentCard.date;
      currentCard.date_from = dateList[0].toLocaleDateString();
      currentCard.date_to = dateList[1].toLocaleDateString();
    }

    datetime.orders = [...allCards, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card?.avatar} alt="" />
        </div>
        <div className={styles.title}>
          <p>{card?.name}</p>
          <span>{card?.category}</span>
        </div>
      </div>
      <div className={styles.type}>
        {card.platform in platformToIcon
          ? platformToIcon[card?.platform]()
          : null}
      </div>
      <div className={styles.type}>
        <CustomCalendar onChange={handleChangeDate} />
      </div>
      <div className={styles.type}>
        <TimeList onChange={handleChangeTime} />
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className={styles.data}>
            <PostIcon />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center shadow-none">
          {formState?.posts?.length ? (
            <div className="w-[18vw] h-full relative">
              <AlertDialogAction>
                <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
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
  );
};
