import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";

export const AddMore: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={`${styles.button} truncate`}>
      <Link to={ENUM_PATHS.CATALOG}>{t(`cart_btn.add`)}</Link>
    </MyButton>
  );
};
