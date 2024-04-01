import { FC } from "react";
import styles from "./styles.module.scss";
import { CatalogSearch } from "./catalogSearch";
import { CatalogList } from "./catalogList";
import { useTranslation } from "react-i18next";

export const CatalogBlock: FC = () => {
  const { t } = useTranslation();
  return (
    // <div className={`${styles.wrapper} container`}>
    <div className="container">
      <div className={`${styles.wrapper}`}>
        <div className={styles.title}>{t("catalog.catalog")}</div>
        <div className={styles.content}>
          <CatalogSearch />
          <CatalogList />
        </div>
      </div>
    </div>
  );
};
