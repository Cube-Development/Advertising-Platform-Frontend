import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

export const BarHistory: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p>{t("wallet_history.tab.date")}</p>
      </div>
      <div className={styles.info}>
        <p>{t("wallet_history.tab.purpose")}</p>
      </div>
      <div className={styles.info}>
        <p>{t("wallet_history.tab.method")}</p>
      </div>
      <div className={styles.info}>
        <p>{t("wallet_history.tab.ammount")}</p>
      </div>
      <div>
        <p>{t("wallet_history.tab.status")}</p>
      </div>
    </div>
  );
};
