import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RepeatOffer: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__white" className={styles.button}>
      {t(`platform_btn.repeat`)}
      <ArrowLongHorizontalIcon className="active__icon" />
    </MyButton>
  );
};
