import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { usePublishPostBloggerMutation } from "@shared/store/services/bloggerOffersService";
import { IOrderFeature } from "@shared/types/order";

export const SendLink: FC<IOrderFeature> = ({ url, order_id }) => {
  const [publishPostBlogger] = usePublishPostBloggerMutation();
  const { t } = useTranslation();
  const handleOnClick = () => {
    publishPostBlogger({ order_id, url })
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
      buttons_type="button__blue"
      className={styles.button}
    >
      {t(`offer_btn.send_link`)}
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
