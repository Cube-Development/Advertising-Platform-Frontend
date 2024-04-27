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

interface PostPlatformProps {
  card: IPostChannel;
  CustomCalendar: FC<DateListProps>;
  TimeList: FC<TimeListProps>;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
}

export const PostPlatform: FC<PostPlatformProps> = ({
  card,
  CustomCalendar,
  TimeList,
  setValue,
  getValues,
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

    console.log(getValues());
  };

  const handleChangeDate = (dateList: Date[]) => {
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
    console.log(getValues());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card.avatar} alt="" />
        </div>
        <div className={styles.title}>
          <p>{card.name}</p>
          <span>{card.category}</span>
        </div>
      </div>
      {/* <div className={styles.type}>
        {platformToIcon.hasOwnProperty(card.platform)
          ? platformToIcon[card.platform]()
          : null}
      </div> */}
      <div className={styles.type}>
        {card.platform in platformToIcon
          ? platformToIcon[card.platform]()
          : null}
      </div>
      <div className={styles.type}>
        <CustomCalendar onChange={handleChangeDate} />
      </div>
      <div className={styles.type}>
        <TimeList onChange={handleChangeTime} />
      </div>
      <div className={styles.data}>
        <PostIcon />
        {/* <p>{card.post}</p> */}
      </div>
    </div>
  );
};
