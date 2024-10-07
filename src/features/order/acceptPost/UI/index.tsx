import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature, useAcceptOrderMutation } from "@entities/project";
import { Loader } from "lucide-react";

export const AcceptPost: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptOrder, { isLoading }] = useAcceptOrderMutation();
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
      {isLoading ? (
        <Loader
          className="animate-spin"
          stroke="#4772e6"
          width={20}
          height={20}
        />
      ) : (
        t(`order_btn.accept`)
      )}
    </MyButton>
  );
};
