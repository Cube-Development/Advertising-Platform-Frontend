import { IAdminTransactionRoute } from "@entities/admin";
import { AddIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface DocumentsProps {
  subcard: IAdminTransactionRoute;
}

export const Documents: FC<DocumentsProps> = ({ subcard }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>
          {t("admin_panel.transactions.card.documents.title").toUpperCase()}
        </p>
      </div>
      {!!subcard?.documents?.length && (
        <div className={styles.documents}>
          {subcard?.documents?.map((item, index) => (
            <div key={index} className={styles.card}>
              <AddIcon />
              <p>{item?.filename}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
