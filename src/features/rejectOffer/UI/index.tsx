import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature } from "@shared/types/order";
import { useCancelOfferMutation } from "@shared/store/services/bloggerOffersService";

export const RejectOffer: FC<IOrderFeature> = ({ order_id }) => {
  const { t } = useTranslation();
  const [cancelOffer] = useCancelOfferMutation();
  const handleOnClick = () => {
    order_id &&
      cancelOffer({ order_id })
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
      {t(`offer_btn.reject`)}
    </MyButton>
  );
};
