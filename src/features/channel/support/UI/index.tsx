import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const Support: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton
      buttons_type="button__blue"
      className={`${styles.button} truncate`}
    >
      {t(`platform_btn.support`)}
    </MyButton>
  );
};
