import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useAcceptOrderMutation } from "@shared/store/services/advOrdersService";
import { IOrderFeature } from "@shared/types/order";

export const AcceptPost: FC<IOrderFeature> = ({ order_id }) => {
  const { t } = useTranslation();
  const [acceptOrder] = useAcceptOrderMutation();
  const handleOnClick = () => {
    acceptOrder({ order_id })
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
      {t(`order_btn.accept`)}
    </MyButton>
  );
};
