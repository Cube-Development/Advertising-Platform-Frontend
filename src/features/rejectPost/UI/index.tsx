import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature } from "@shared/types/order";
import { useRejectOrderMutation } from "@shared/store/services/advOrdersService";

export const RejectPost: FC<IOrderFeature> = ({ order_id }) => {
  const [rejectOrder] = useRejectOrderMutation();
  const { t } = useTranslation();
  const handleOnClick = () => {
    rejectOrder({ order_id })
      .unwrap()
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
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
