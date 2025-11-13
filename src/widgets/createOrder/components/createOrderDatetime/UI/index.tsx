import { ICreatePostForm, IPostChannel } from "@entities/project";
import {
  ContinueOrder,
  CustomCalendar,
  OrderCard,
  TimeList,
} from "@features/createOrder";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ICreateOrderBlur } from "@widgets/createOrder/model";
import { ENUM_ROLES } from "@entities/user";

interface CreateOrderDatetimeProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
  role: ENUM_ROLES;
}

export const CreateOrderDatetime: FC<CreateOrderDatetimeProps> = ({
  cards,
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
  formState,
  role,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCheckDatetimes = () => {
    const form: ICreatePostForm = getValues();
    if (cards?.length === form.datetime?.orders?.length) {
      const condition = form.datetime?.orders?.reduce((acc, item) => {
        return (
          acc &&
          !!item?.time_from &&
          !!item?.time_to &&
          (!!item?.date || (!!item?.date_from && !!item?.date_to))
        );
      }, true);
      if (condition) {
        if (role === ENUM_ROLES.AGENCY) {
          onChangeBlur("prices");
        } else {
          onChangeBlur("payment");
        }
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
