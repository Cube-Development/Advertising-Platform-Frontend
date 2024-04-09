import { CustomCalendar } from "@features/calendar";
import { ContinueOrder } from "@features/continueOrder";
import { PostPlatform } from "@features/postPlatform";
import { TimeList } from "@features/timeList";
import { ICreatePostForm, IPostChannel } from "@shared/types/createPost";
import { ICreateOrderBlur } from "@shared/types/platform";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CreateOrderDatetimeProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: any;
  getValues: any;
}

export const CreateOrderDatetime: FC<CreateOrderDatetimeProps> = ({
  cards,
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
}) => {
  const { t } = useTranslation();

  const handleCheckDatetimes = () => {
    const form: ICreatePostForm = getValues();
    console.log(form.datetime);
    if (cards.length === form.datetime.orders.length) {
      const condition = form.datetime.orders.reduce((acc, item) => {
        return (
          acc &&
          Boolean(item.time_from) &&
          Boolean(item.time_to) &&
          (Boolean(item.date) ||
            (Boolean(item.date_from) && Boolean(item.date_to)))
        );
      }, true);
      console.log(condition);
      if (condition) {
        onChangeBlur("payment");
      }
    }
  };

  return (
    <div className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.title}>
            <span>3</span>
            <p>{t("create_order.datetime.title")}</p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.cards}>
            {cards.map((card, index) => (
              <PostPlatform
                card={card}
                key={index}
                CustomCalendar={CustomCalendar}
                TimeList={TimeList}
                setValue={setValue}
                getValues={getValues}
              />
            ))}
          </div>
          <div className={styles.continue}>
            <ContinueOrder onClick={handleCheckDatetimes} />
          </div>
        </div>
      </div>
    </div>
  );
};
