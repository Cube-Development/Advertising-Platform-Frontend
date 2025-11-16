import { IOrderFeature, useAcceptOrderMutation } from "@entities/project";
import { MyButton, useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const AcceptPost: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const [acceptOrder, { isLoading }] = useAcceptOrderMutation();
  const handleOnClick = () => {
    order_id &&
      !isLoading &&
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
          stroke="#0BADC2"
          width={20}
          height={20}
        />
      ) : (
        <big>{t(`order_btn.accept`)}</big>
      )}
    </MyButton>
  );
};
