import { FC } from "react";
import styles from "./styles.module.scss";
import { IPostChannel } from "@shared/types/createPost";
import { ClockIcon, PostIcon, TelegramIcon } from "@shared/assets";

interface PostPlatformProps {
  card: IPostChannel;
  CustomCalendar: FC;
  TimeList: FC;
}

export const PostPlatform: FC<PostPlatformProps> = ({
  card,
  CustomCalendar,
  TimeList,
}) => {
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
      <div className={styles.type}>
        <TelegramIcon />
      </div>
      <CustomCalendar />
      <TimeList />
      <div className={styles.data}>
        <PostIcon />
        <p>{card.post}</p>
      </div>
    </div>
  );
};
