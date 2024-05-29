import { useRejectOrderMutation } from "@shared/store/services/advOrdersService";
import { IOrderFeature } from "@shared/types/order";
import { MyButton } from "@shared/ui";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RejectPost: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const [rejectOrder] = useRejectOrderMutation();
  const { t } = useTranslation();
  const handleOnClick = () => {
    order_id &&
      rejectOrder({ order_id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.reject_post.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.reject_post.error"),
            description: error,
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
      {t(`order_btn.reject`)}
    </MyButton>
  );
};
