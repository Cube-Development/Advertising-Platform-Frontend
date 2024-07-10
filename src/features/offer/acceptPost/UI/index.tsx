import { useAcceptOrderMutation } from "@shared/store/services/advOrdersService";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature } from "@entities/project";

export const AcceptPost: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptOrder] = useAcceptOrderMutation();
  const handleOnClick = () => {
    order_id &&
      acceptOrder({ order_id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.accept_post.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.accept_post.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton
      onClick={handleOnClick}
      buttons_type="button__white"
      className={styles.button}
    >
      {t(`order_btn.accept`)}
    </MyButton>
  );
};
