import { AdminUsers } from "@shared/config";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UsersList } from "../usersList";
import styles from "./styles.module.scss";

export const Users: FC = () => {
  const { t } = useTranslation();
  const users = AdminUsers;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.users")}</h1>
          <p>
            {t("admin_panel.pages.home")}
            <span> / {t("admin_panel.pages.users")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <UsersList users={users} />
        </div>
      </div>
    </div>
  );
};
