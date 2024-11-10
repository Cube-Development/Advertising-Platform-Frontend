import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import {
  ContinueOrder,
  CustomCalendar,
  OrderCard,
  TimeList,
} from "@features/createOrder";
import { ICreatePostForm, IPostChannel } from "@entities/project";
import { ICreateOrderBlur } from "@widgets/createOrder/config";
import { useToast } from "@shared/ui";

interface CreateOrderDatetimeProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const CreateOrderDatetime: FC<CreateOrderDatetimeProps> = ({
  cards,
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
  formState,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCheckDatetimes = () => {
    const form: ICreatePostForm = getValues();
    if (cards?.length === form.datetime?.orders?.length) {
      const condition = form.datetime?.orders?.reduce((acc, item) => {
        return (
          acc &&
          Boolean(item?.time_from) &&
          Boolean(item?.time_to) &&
          (Boolean(item?.date) ||
            (Boolean(item?.date_from) && Boolean(item?.date_to)))
        );
      }, true);
      if (condition) {
        onChangeBlur("payment");
      } else {
        toast({
          variant: "error",
          title: t("toasts.create_order.date.add_dates_error"),
        });
      }
    } else {
      toast({
        variant: "error",
        title: t("toasts.create_order.date.add_dates_error"),
      });
    }
  };

  return (
    <div id="datetime" className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.title}>
            <span className="gradient_color">3</span>
            <p className="gradient_color">{t("create_order.datetime.title")}</p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.cards}>
            {cards?.map((card, index) => (
              <OrderCard
                card={card}
                key={index}
                CustomCalendar={CustomCalendar}
                TimeList={TimeList}
                setValue={setValue}
                getValues={getValues}
                formState={formState}
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
