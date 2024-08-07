import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

export const ChangeChannel: FC<{ project_id: string }> = ({ project_id }) => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    Cookies.set("project_id", project_id);
    Cookies.set("rereview", "true");
  };

  return (
    <Link to={paths.cart} onClick={handleOnClick}>
      <MyButton buttons_type="button__white" className={styles.button}>
        {t(`order_btn.changeChannel`)}
      </MyButton>
    </Link>
  );
};
