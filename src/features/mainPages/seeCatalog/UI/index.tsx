import { ENUM_PATHS } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const SeeCatalog: FC = () => {
  const { t } = useTranslation();

  return (
    <Link to={ENUM_PATHS.CATALOG}>
      <MyButton className={styles.button}>
        <p>{t(`btn_catalog`)}</p>
      </MyButton>
    </Link>
  );
};
