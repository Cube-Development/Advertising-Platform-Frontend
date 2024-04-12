import { ArrowIcon2 } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

export const SeeOffers: FC = () => {
  const { t } = useTranslation();
  return (
    <Link to={paths.offers}>
      <MyButton buttons_type="button__blue" className={styles.button}>
        {t(`platform_btn.offer`)}
        <ArrowIcon2 />
      </MyButton>
    </Link>
  );
};
