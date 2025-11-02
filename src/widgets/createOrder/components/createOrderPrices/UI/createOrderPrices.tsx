import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ICreatePostForm, IOrderPrice } from "@entities/project";
import { OrderCard } from "./orderCard";
import { ICreateOrderBlur } from "../../../model";
import styles from "./styles.module.scss";
import { ContinueOrder } from "@features/createOrder";
import { useToast } from "@shared/ui";

interface CreateOrderPricesProps {
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  projectPrices: IOrderPrice[];
}

export const CreateOrderPrices: FC<CreateOrderPricesProps> = ({
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
  projectPrices,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const handleCheckPrices = () => {
    const prices = getValues("prices") || [];
    const condition = prices.every(
      (price: IOrderPrice) => price.selected_format.price > 0,
    );
    if (condition) {
      onChangeBlur("payment");
    } else {
      toast({
        variant: "error",
        title: t("toasts.create_order.prices.add_prices_error"),
      });
    }
  };

  useEffect(() => {
    setValue("prices", projectPrices);
  }, [projectPrices]);

  return (
    <div id="prices" className={`${isBlur ? "blur" : ""}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.title}>
              <span className="gradient_color">4</span>
              <p className="gradient_color">{t("create_order.prices.title")}</p>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.cards}>
              {projectPrices?.map((order) => (
                <OrderCard
                  key={order.order_id}
                  order={order}
                  setValue={setValue}
                  getValues={getValues}
                />
              ))}
            </div>
            <div className={styles.continue}>
              <ContinueOrder onClick={handleCheckPrices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
