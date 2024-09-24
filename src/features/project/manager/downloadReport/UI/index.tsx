import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface DownloadReportProps {}

export const DownloadReport: FC<DownloadReportProps> = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>{t(`order_btn.seeReport`)}</MyButton>
  );
};
