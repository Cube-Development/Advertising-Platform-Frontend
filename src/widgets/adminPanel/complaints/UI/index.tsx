import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ComplaintsList } from "../complaintsList";
import { AdminComplaints } from "@shared/config";

export const Complaints: FC = () => {
  const { t } = useTranslation();
  const complaints = AdminComplaints;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.complaints")}</h1>
          <p>
            {t("admin_panel.pages.moderation")}
            <span> / {t("admin_panel.pages.complaints")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <ComplaintsList complaints={complaints} />
        </div>
      </div>
    </div>
  );
};
