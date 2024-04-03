import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PostPlatform } from "@features/postPlatform";
import { IPostChannel } from "@shared/types/createPost";
import { CustomCalendar } from "@features/calendar";
import { TimeList } from "@features/timeList";
import { Chat } from "@widgets/header/UI/chat";
import { ICreateOrderBlur } from "@shared/types/platform";

interface CreateOrderDatetimeProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
}

export const CreateOrderDatetime: FC<CreateOrderDatetimeProps> = ({
  cards,
  isBlur,
  onChangeBlur,
}) => {
  const { t } = useTranslation();

  const handleOnChangeBlur = () => {
    onChangeBlur("payment");
  };

  return (
    <div className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>3</span>
            <p>{t("create_order.datetime.title")}</p>
          </div>
        </div>
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <PostPlatform
              card={card}
              key={index}
              CustomCalendar={CustomCalendar}
              TimeList={TimeList}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
