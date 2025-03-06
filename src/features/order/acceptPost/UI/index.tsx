import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  advProjectsAPI,
  IOrderFeature,
  managerProjectsAPI,
  useAcceptOrderMutation,
} from "@entities/project";
import { useAppDispatch } from "@shared/hooks";

export const AcceptPost: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleInvalidateCache = () => {
    dispatch(advProjectsAPI.util.resetApiState());
    dispatch(managerProjectsAPI.util.resetApiState());
  };
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
          handleInvalidateCache();
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
        <big>{t(`order_btn.accept`)}</big>
      )}
    </MyButton>
  );
};
