import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature } from "@shared/types/order";
import { Link } from "react-router-dom";

export const CheckPost: FC<IOrderFeature> = ({ url }) => {
  const { t } = useTranslation();
  return (
    <Link to={url!} target="_blank">
      <MyButton buttons_type="button__white" className={styles.button}>
        {t(`order_btn.checkPost`)}
      </MyButton>
    </Link>
  );
};
