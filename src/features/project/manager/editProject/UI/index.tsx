import { cookiesTypes } from "@shared/config";
import { paths } from "@shared/routing";
import { MyButton } from "@shared/ui";
import Cookies from "js-cookie";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export interface EditProjectProps {
  project_id: string;
}

export const EditProject: FC<EditProjectProps> = ({ project_id }) => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    Cookies.set(cookiesTypes.projectId, project_id);
    Cookies.set(cookiesTypes.isReview, "true");
  };

  return (
    <Link to={paths.cart} onClick={handleOnClick}>
      <MyButton className={styles.button} buttons_type="button__white">
        <p>{t("orders_manager.card.edit_btn")}</p>
      </MyButton>
    </Link>
  );
};
