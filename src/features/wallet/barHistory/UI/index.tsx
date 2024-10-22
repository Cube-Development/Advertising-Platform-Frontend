import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const BarHistory: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={`truncate ${styles.info}`}>
        {t("wallet_history.tab.date")}
      </div>
      <div className={`truncate ${styles.info}`}>
        {t("wallet_history.tab.purpose")}
      </div>
      <div className={`truncate ${styles.info}`}>
        {t("wallet_history.tab.method")}
      </div>
      <div className={`truncate ${styles.info}`}>
        {t("wallet_history.tab.ammount")}
      </div>
      <div>{t("wallet_history.tab.status")}</div>
    </div>
  );
};
