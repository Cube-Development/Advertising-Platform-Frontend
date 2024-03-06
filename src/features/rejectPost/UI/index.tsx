import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RejectPost: FC = () => {
  const { t } = useTranslation();
  return <MyButton className={styles.button}>{t(`order_btn.reject`)}</MyButton>;
};
