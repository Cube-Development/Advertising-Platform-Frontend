import Cookies from "js-cookie";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { paths } from "@shared/routing";

export const ChangePost: FC<{ project_id: string }> = ({ project_id }) => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    Cookies.set("project_id", project_id);
    Cookies.set("rereview", "true");
  };

  return (
    <Link to={paths.cart} onClick={handleOnClick}>
      <MyButton buttons_type="button__white" className={styles.button}>
        {t(`order_btn.changePost`)}
      </MyButton>
    </Link>
  );
};
