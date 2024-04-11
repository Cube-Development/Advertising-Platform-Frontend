import { ArrowIcon2 } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const SeeOffers: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__blue" className={styles.button}>
      {t(`platform_btn.offer`)}
      <ArrowIcon2 />
    </MyButton>
  );
};
