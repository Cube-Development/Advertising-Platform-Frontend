import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature } from "@shared/types/order";
import { useAcceptOfferMutation } from "@shared/store/services/bloggerOffersService";

export const AcceptOffer: FC<IOrderFeature> = ({ order_id }) => {
  const [acceptOffer] = useAcceptOfferMutation();
  const handleOnClick = () => {
    acceptOffer({ order_id })
      .unwrap()
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };
  const { t } = useTranslation();
  return (
    <MyButton
      onClick={handleOnClick}
      buttons_type="button__white"
      className={styles.button}
    >
      {t(`offer_btn.accept`)}
    </MyButton>
  );
};
