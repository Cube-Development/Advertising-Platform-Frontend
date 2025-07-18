import { EyeDisabledIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const EmptyPost: FC = ({}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p></p>
      <div className={styles.middle}>
        <div>
          <EyeDisabledIcon />
        </div>
        <span>{t("create_order.create.site")}</span>
      </div>
      <div className={styles.bottom}>
        <div>
          <div className={styles.stroke} />
        </div>
      </div>
    </div>
  );
};
