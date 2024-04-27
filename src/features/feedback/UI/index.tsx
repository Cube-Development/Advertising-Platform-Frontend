import { ArrowLongHorizontalIcon, StarIcon2 } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const Feedback: FC = () => {
  const { t } = useTranslation();

  return (
    <MyButton buttons_type="button__white" className={styles.button}>
      <div className={styles.content}>
        {t(`order_btn.feedback`)}
        <StarIcon2 />
      </div>
      <ArrowLongHorizontalIcon className="active__icon" />
    </MyButton>
  );
};
