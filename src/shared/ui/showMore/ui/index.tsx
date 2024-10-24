import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const ShowMoreBtn = () => {
  const { t } = useTranslation();
  return (
    <button className={styles.btn}>
      <p className="gradient_color">{t("pagination.show_more")}</p>
    </button>
  );
};
