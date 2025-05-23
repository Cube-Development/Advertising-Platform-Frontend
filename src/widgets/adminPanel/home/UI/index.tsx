import { ENUM_PATHS } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const AdminHome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className={styles.adminHome}>
        <h1 className={styles.title}>{t("admin_panel.home.title")}</h1>
        <p className={styles.subtitle}>{t("admin_panel.home.text")}</p>
        <div className={styles.grid}>
          <Link to={ENUM_PATHS.ADMIN_CHANNELS} className={styles.card}>
            <h2>{t("admin_panel.home.channels.title")}</h2>
            <p>{t("admin_panel.home.channels.text")}</p>
          </Link>

          <Link to={ENUM_PATHS.ADMIN_USERS} className={styles.card}>
            <h2>{t("admin_panel.home.users.title")}</h2>
            <p>{t("admin_panel.home.users.text")}</p>
          </Link>

          <Link to={ENUM_PATHS.ADMIN_TRANSACTIONS} className={styles.card}>
            <h2>{t("admin_panel.home.transactions.title")}</h2>
            <p>{t("admin_panel.home.transactions.text")}</p>
          </Link>

          <Link to={ENUM_PATHS.ADMIN_REVIEWS} className={styles.card}>
            <h2>{t("admin_panel.home.reviews.title")}</h2>
            <p>{t("admin_panel.home.reviews.text")}</p>
          </Link>

          <Link to={ENUM_PATHS.ADMIN_COMPLAINTS} className={styles.card}>
            <h2>{t("admin_panel.home.complaints.title")}</h2>
            <p>{t("admin_panel.home.complaints.text")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
