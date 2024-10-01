import { SadSmileIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const ZeroManagerProject: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.no__project}>
        <div className={styles.smile}>
          <div>
            <SadSmileIcon />
          </div>
          <p>{t("orders_advertiser.no_project")}</p>
        </div>
      </div>
    </div>
  );
};
