import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { MyButton } from "@shared/ui";
import { paths } from "@shared/routing";
import { useTranslation } from "react-i18next";

export const LoginBtn: FC = () => {
  const { t } = useTranslation();

  return (
    <Link to={paths.login} className={styles.wrapper}>
      <MyButton>{t("registration")}</MyButton>

      <div className={styles.loginBtn}>
        <button>{t("login")}</button>
        <img src="images/common/login.svg" alt="" />
      </div>
    </Link>
  );
};
