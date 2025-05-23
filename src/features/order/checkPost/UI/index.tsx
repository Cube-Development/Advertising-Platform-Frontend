import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { IOrderFeature } from "@entities/project";

export const CheckPost: FC<IOrderFeature> = ({ url }) => {
  const { t } = useTranslation();
  console.log(url);
  return (
    <Link to={url!} target="_blank">
      <MyButton buttons_type="button__white" className={styles.button}>
        {t(`order_btn.checkPost`)}
      </MyButton>
    </Link>
  );
};
