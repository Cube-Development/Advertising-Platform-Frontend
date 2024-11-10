import { AdminReviews } from "@shared/config";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReviewsList } from "../reviewsList";
import styles from "./styles.module.scss";

export const Reviews: FC = () => {
  const { t } = useTranslation();
  const reviews = AdminReviews;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.reviews")}</h1>
          <p>
            {t("admin_panel.pages.moderation")}
            <span> / {t("admin_panel.pages.reviews")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <ReviewsList reviews={reviews} />
        </div>
      </div>
    </div>
  );
};
