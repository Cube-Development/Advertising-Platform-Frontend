import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const ShowMoreBtn = () => {
  const { t } = useTranslation();
  return <button className={styles.btn}>{t("pagination.show_more")}</button>;
};
